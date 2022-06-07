import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="logo">
                    <span ><Link to="/" className='logo__text'> UNIVERSESTORE </Link></span>
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
                        <button className="bar__search"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    <CartWidget items={4} />
                </div>
            </div>
        </header>
    )
}

export default Navbar