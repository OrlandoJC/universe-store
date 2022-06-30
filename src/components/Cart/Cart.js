import './Cart.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import CartContext from '../context/CartContext'
import CartItem from '../CartItem/CartItem'

const Cart = () => {
    const { cart, totalProducts, totalPrice } = useContext(CartContext)
    const { user } = useContext(AuthContext)

    const itemsTotal = totalProducts();
    const totalCart = totalPrice();

    return (
        <div className='Cart container'>
            <h1>Carrito</h1>
            {
                itemsTotal === 0
                    ? <div className='Cart__message'>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3428238-2902697.png" width={590} />
                        <h1>El carrito esta vacio!</h1>
                        <button className='button__continue'><Link to="/">Ir a comprar 😏</Link></button>
                    </div>
                    : <div className='Cart__container'>
                        <div className='Cart__resume'>
                            {cart.map(item => <CartItem key={item.id} item={item} />)}
                        </div>
                        <div className='Cart__summary'>
                            <h2>Orden</h2>
                            <div className='Cart__row'>
                                <p><b>Cantidad</b></p>
                                <p className='price'> {itemsTotal} productos</p>
                            </div>
                            <div className='Cart__row'>
                                <p><b>Total</b></p>
                                <p className='price'> ${totalCart} MXN</p>
                            </div>
                            <div className='Cart__row'>
                                <p><b>Envio</b></p>
                                <p className='price'> $0 MXN </p>
                            </div>
                            <button className='proceed__button'>
                                <Link to={user ? "/checkout" : "/login/?redirect=checkout"} className="proceed"> Proceder al pago</Link>
                            </button>
                        </div>
                    </div>
            }
        </div>
    )

}


export default Cart