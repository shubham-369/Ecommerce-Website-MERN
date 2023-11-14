import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Cart = () => {
    const [data, setData] = useState([]);

    async function CartItems(){
        try {
            const carts = await axios.get(`http://localhost:4500/shop/cart`);                
            setData(carts.data);
        } catch (error) {
            console.log('Error while getting cart items', error);
        }
    }

    async function PlaceOrder(){
        try {
            await axios.get('http://localhost:4500/shop/buy');
            window.location.href='/orders';
        } catch (error) {
            console.log('Error while making an order', error);
        }
    }
    
    async function DeleteCart(e){
        const id = e.target.getAttribute('data-id');
        try {
            await axios.delete(`http://localhost:4500/shop/deleteCart?id=${id}`);
            e.target.parentElement.parentElement.parentElement.remove();
        } catch (error) {
            console.log('Error while deleting cart item', error);
        }
    }

    useEffect(()=> {
        CartItems();
    }, []);

  return (
    <>
        <div className="container mt-3">
      
        { data.length > 0 ? (
            <>
                <div className="d-block"> 
                {data.map((element, index) => {
                    const { quantity, productId } = element;
                    return (
                    <div key={index} className="card bg-light my-5" style={{maxWidth: '100%', maxHeight: '15rem'}}>
                        <div className="card-body float-right">
                            <h5 className="card-title">{ productId.title }</h5>
                            <h3 className="card-text font-weight-bold">Quantity : { quantity }</h3>
                            <div className="d-flex justify-content-end">
                                <button data-id={productId._id} className="btn btn-danger" onClick={ (e) => DeleteCart(e) }>Delete</button>
                            </div>
                        </div>
                    </div>
                    )
                })}
                </div>
                <button className="btn btn-block btn-success" onClick={ PlaceOrder }>Order now</button>
            </>
        ):(
            <>
                <h1>No items in your Cart!</h1>
            </>
        )}
        </div>
    </>
  )
}

export default Cart;
