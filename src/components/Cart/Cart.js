import './Cart.css'
import { useContext, useState} from 'react'
import CartContext from '../context/CartContext'
import { AuthContext } from '../context/authContext'
import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

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
                            {/* <PayPalScriptProvider
                                options={{ "client-id": "AaODT2ljM--tWSg_szSgbZIahDpTvaG0k5R6PzXDLhQitmmDC7EuNIuRGeXKy1_AJ6x5r-MalIKz3Pmq" }}>
                                <PayPalButtons

                                    createOrder={(data, actions) => {
                                        return actions.order.create(
                                            {
                                                description: "lol",
                                                purchase_units: [{
                                                    amount: {
                                                        currency_code: "MXN",
                                                        value: totalPrice()
                                                    }
                                                }],
                                                application_context: {
                                                    shipping_preference: "NO_SHIPPING"
                                                }
                                            }
                                        )
                                    }}

                                    onError={(err) => {
                                        console.log(err)
                                    }}

                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then(function (details) {
                                            alert('Transaction completed by ' + details.payer.name.given_name);
                                        });
                                    }} />
                            </PayPalScriptProvider> */}
                        </div>
                    </div>
            }
        </div>
    )

}


export default Cart