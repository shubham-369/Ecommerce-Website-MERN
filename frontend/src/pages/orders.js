import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Orders = () => {

    const [ data, setData ] = useState([]);

    async function AllOrders(){
        try {
            const orderData = await axios.get('http://localhost:4500/shop/orders');
            setData(orderData.data);
        } catch (error) {
            console.log('Error while showing orders!', error);
        }
    };

    useEffect(() => {
      AllOrders();  
    }, []);

  return (
    <>
        {data.length <= 0 ? ( 
            <h1>No orders here!</h1>
        ) : (
            <ul>
                {data.map((prod) => ( 
                    <li key={prod._id}>
                        <h1>{prod._id}</h1>
                        <ul>
                            {prod.products.map((product) => (
                                <li key={product.product._id}>
                                    {product.product.title} ({product.quantity})
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        )}
    </>

  )
}

export default Orders
