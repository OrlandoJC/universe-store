import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const CartWidget = ({items}) => {
    return (
        <div className="cart" id="cart">
            <div>
                <FontAwesomeIcon icon={faCartShopping} />  <span id="cart__counter">{items}</span>
            </div>
        </div>
    )
}

export default CartWidget