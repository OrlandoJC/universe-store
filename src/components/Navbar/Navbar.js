import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <header className="header">
            <div className="header__container container">
                <div className="logo">
                    <span>UNIVERSESTORE</span>
                </div>
                <div className='header__categories'>
                    <ul>
                        <li>PLayeras</li>
                        <li>Jerseys</li>
                        <li>shorts</li>
                        <li>sudaderas</li>
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