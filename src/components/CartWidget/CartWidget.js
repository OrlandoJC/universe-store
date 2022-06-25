import './CartWidget.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const CartWidget = ({ items }) => {
    return (
        <div className="cart" id="cart">
            <div>
                <Link to="/cart">
                    <FontAwesomeIcon  className="cart__counter" icon={faCartShopping} />  <span className="cart__counter">{items}</span>
                </Link>
            </div>
        </div>
    )
}

export default CartWidget