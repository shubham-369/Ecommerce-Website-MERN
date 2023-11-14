import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DeleteProduct = async(e) => {
    const id = e.target.getAttribute('data-id');
    try{      
        await axios.delete(`http://localhost:4500/admin/admin-product?deleteID=${id}`);
       
        e.target.parentElement.parentElement.parentElement.remove();
    }
    catch(error) {
        console.error('error while deleting data', error);
    }
}
const AddCart = async(e) => {
    const id = e.target.getAttribute('data-id');
    try{      
        await axios.post(`http://localhost:4500/shop/cart`, { productID: id });
    }
    catch(error) {
        console.error('error while adding product to cart', error);
    }
}

const Products = ({userType}) => {

    const [ data, setData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4500/admin/admin-product');
                setData(response.data);
            } catch (error) {
                console.log('Error while getting dishes!', error);
            }
        };
    
        fetchData();    
    }, [setData]);
    

  return (
    <>
        <div className="container mt-3">
            <div className="d-flex flex-wrap gap-3" id="admin-list">
            {data.length === 0 ? (
                <>
                    <img src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/media/1df2396f1eaa146bcb7dd3e73c1dc77b.gif" alt="Loading..." />
                </>
            )
            : ( 
            data.map((element, index) =>{
                const { url, title, description, _id, price } = element;
                return (
                <div key={index} className="card mb-3" style={{maxWidth: '18rem', maxHeight: '30rem'}}>
                    <img className="card-img-top h-50" src={url} alt={`${title}`} />
                    <div className="card-body">
                        <h5 className="card-title">{ title }</h5>
                        <p className="card-text">{ description }</p>
                        <h3 className="card-text font-weight-bold">$ { price }</h3>
                        <div className="d-flex justify-content-around">
                            {userType === 'admin' ? (
                                <>
                                <Link to={`/addProduct?updateID=${_id}`} className="btn btn-primary" >Update</Link>
                                <button data-id={ _id } className="btn btn-danger" onClick={ (e) => DeleteProduct(e) }>Delete</button>
                                </>
                            ):(
                                <>
                                <Link to={`/products?detailID=${_id}`} className="btn btn-primary">Details</Link>
                                <button data-id={ _id } className="btn btn-secondary" onClick={ (e) => AddCart(e) } >Add to cart</button>
                                </>
                            )}
            
                        </div>
                    </div>
                </div>
                )
            })
            )}</div>
        </div>
    </>
  )
};

export default Products;
