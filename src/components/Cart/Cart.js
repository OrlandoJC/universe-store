import './Cart.css'
import CartContext from '../context/CartContext'
import { useContext } from 'react'
import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cart, totalProducts, totalPrice } = useContext(CartContext)

    const itemsTotal = totalProducts();
    const totalCart = totalPrice();

    return (
        <div className='Cart'>
            <h1>Carrito</h1>
            {
                itemsTotal === 0
                    ? <div className='Cart__message'>
                        <img src="./images/empty.jpg" width={500} />
                        <h1>El carrito esta vacio!</h1>
                        <button className='button__continue'><Link to="/">Ir a comprar</Link></button>
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
                                Proceder al pago
                            </button>
                        </div>
                    </div>
            }
        </div>
    )

}


export default Cart