import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {faHeart, faUser} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import CartContext from '../context/CartContext'


const Navbar = () => {
    const {cart, totalProducts} = useContext(CartContext)
    
    const total = totalProducts();

    return (
        <header className="header">
            <div className="header__container">
                <div className="logo">
                    <span ><Link to="/" className='logo__text'> UNIVERSE-STORE </Link></span>
                </div>
                <div className='header__categories'>
                    <ul>
                        <li><Link to="/category/playera"> playeras </Link></li>
                        <li><Link to="/category/jersey"> jerseys </Link></li>
                        <li><Link to="/category/sudadera"> sudadera </Link></li>
                    </ul>
                </div>
                <div className="header__group">
                    <div className="header__bar">
                        {/* <input className="hedaer__finder" id="search" type="text" placeholder="Buscar.." /> */}
                        <button className="bar__search"><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/></button>
                        <span><FontAwesomeIcon icon={faHeart}  className="icon"/></span>
                        <span><FontAwesomeIcon icon={faUser}  className="icon"/></span>

                    </div>
                    <CartWidget items={total} />
                </div>
            </div>
        </header>
    )
}

export default Navbar