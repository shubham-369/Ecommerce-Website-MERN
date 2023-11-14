import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './css/add-product.css';

const inputs = [
    {type: 'hidden', name: '_id'},
    {type: 'text', name: 'title', label: 'Title'},
    {type: 'url', name: 'url', label: 'Image URL'},
    {type: 'number', name: 'price', label: 'Price'},
    {name: 'description', label: 'Description'},
]


const intialFormData = {
    productID: '',
    title: '',
    url: '',
    price: '',
    description: '',
};

const AddProduct = () => {
    const [data, setData] = useState(intialFormData);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const updateID = urlParams.get('updateID');

    useEffect(() => {
        if(!updateID){ return };

        return async() => {
            try {
                const productData = await axios.get(`http://localhost:4500/admin/add-product?updateID=${updateID}`);
                setData(productData.data);
            } catch (error) {
                console.error('Error while showing data in form', error);
            }
        };
    }, [updateID]);

    const subtmitForm = async(e) => {
        e.preventDefault();
        const jsonData = JSON.stringify(data);
        try{                
            const response = await axios.post('http://localhost:4500/admin/add-product', jsonData,  
            { headers: {
                'Content-Type': 'application/json',
              }
            });
            console.log('Data saved! ', response.data);
            if(true){
                window.location.href = '/admin';
            }
            
            setData(intialFormData);
        }
        catch(error){
            console.log('error while saving data', error);
        }

    }
  return (
    <>
        <div className="container justify-content-center">
            <form action="#" onSubmit={subtmitForm} method="POST" className="mt-5">
                {inputs.map((inputData) => {
                    const { name, label, type } = inputData;

                    if (name === 'productID') {
                        return <input type={type} name={name} value={data[name] || ''} onChange={(e) => setData({...data, [ name ]: e.target.value || ''})} key={name} />;
                    } else {
                        return (
                            <div className="form-group" key={name}>
                                <label htmlFor={name}>{label}</label>
                                {name === 'description' ? (
                                    <textarea className="form-control" rows="6" name={name} value={data[name]} onChange={(e) => setData({ ...data, [ name ]: e.target.value})}  required></textarea>
                                ) : (
                                    <input type={type} className="form-control" name={name} value={data[name]} onChange={(e) => setData({ ...data, [ name ]: e.target.value})}  required />
                                )}
                            </div>
                        );
                    }
                })}
                <button className="btn btn-success mt-3" type="submit">{ updateID ? 'Update Product' : 'Add Product' }</button>
            </form>
        </div>
    </>
  )
}

export default AddProduct;
