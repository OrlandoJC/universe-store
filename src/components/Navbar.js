import CartWidget from './CartWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
                        <button className="bar__search"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    <CartWidget items={4} />
                </div>
            </div>
        </header>
    )
}

export default Navbar