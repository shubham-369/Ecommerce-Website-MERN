import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import AddProduct from './pages/add-product';
import Products from './pages/products';
import Details from './pages/product_details';
import Cart from './pages/cart';
import Orders from './pages/orders';

const App = () => {
  return (
    <Router>
    <>
      <Navbar />
      <Routes>
        <Route exact path='/addProduct' element={ <AddProduct /> }/>
        <Route path='/admin' element={ <Products userType="admin" />} />
        <Route path='/shop' element={ <Products userType="shop" />} />
        <Route path='/products' element={ <Details /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/orders' element={ <Orders /> } />
      </Routes>
    </>
    </Router>
  )
}

export default App
