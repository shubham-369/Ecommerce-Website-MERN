import React, { useState, useEffect } from 'react';
import './css/product-details.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Details = () => {
    const [ data, setData ] = useState({});
    
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const detailID = urlParams.get('detailID');

    useEffect(() => {
        async function productDetails(){
            try {
                const details = await axios.get(`http://localhost:4500/shop/products?detailID=${detailID}`);
                setData(details.data);
            } catch (error) {
                console.error('Error while showing product details', error);
            }
        }
        productDetails();
    },[detailID, setData])


    const {url, title, description, price} = data;
    
  return (
    <>
        <div className="container mt-3">
            <div className="row">
                <div className="col-6">
                <img src={ url } className="details-img" alt='Product' />
                </div>
                <div className="col-6">
                    <h3>{ title }</h3>
                    <h6>{ description }</h6>
                    <h1>$ { price }</h1>
                </div>
            </div> 
        </div>
    </>
  )
}

export default Details;
