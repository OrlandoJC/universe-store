import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <header className="header">
            <div className="header__container container">
                <div className="logo">
                <img src="https://labrocheta.netlify.app/assets/img/icons/logo.png" alt="" width="50px" />
                </div>

                <div className="header__group">
                    <div className="header__bar">
                        <input className="hedaer__finder" id="search" type="text" placeholder="Buscar.." />
                        <button className="bar__search"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    </div>
                    <div className="cart" id="cart">
                        <div>
                        <FontAwesomeIcon icon={faCartShopping}/> Carrito: <span id="cart__counter">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar