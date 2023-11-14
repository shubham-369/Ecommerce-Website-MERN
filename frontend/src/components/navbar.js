import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navlinks = [
        {label: 'Shop', link:'/shop'},
        {label: 'Cart', link:'/cart'},
        {label: 'Orders', link:'/orders'},
        {label: 'Add Product', link:'/addProduct'},
        {label: 'Admin Product', link:'/admin'}
    ]
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {navlinks.map((element, index) => {
                        const {label, link} = element;
                        return (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={link}>{label}</Link>
                            </li>
                        );
                    })}
          
                </ul>
            </div>
        </nav>

    </>
  )
}


export default Navbar;
