import { createContext, useState } from "react";


const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const isInCart = (id) => {
        return cart.some(product => product.id === id)
    }

    const incrementItem = (id) => {
        setCart(cart.map(item => item.id == id ? { ...item, quantity: item.quantity + 1 } : item))
    }

    const decrementItem = (id) => {
        setCart(cart.map(item => item.id == id ? { ...item, quantity: item.quantity - 1 } : item))
    }

    const addToCart = (item, quantity) => {
        if (isInCart(item.id)) {
            const newCart = cart.map(
                product => {
                    if (product.id === item.id) {
                        return { ...product, quantity: product.quantity + quantity }
                    }
                    return product
                }
            )

            setCart(newCart)
            return;
        }

        setCart([...cart, { ...item, quantity }])
    }

    const removeItem = (id) => {
        setCart(cart.filter(product => product.id !== id))
    }

    const totalProducts = () => {
        return cart.reduce((acc, curr) => acc + curr.quantity, 0)
    }

    const totalPrice = () => {
        return cart.map(
            ({price, quantity}) => quantity * price
        ).reduce((acc, curr) => acc + curr, 0)
    }

    const getQuantity = (id) => {
        const item = cart.find(item => item.id === id)
        return item.quantity;
    }

    const clear = () => {
        setCart([])
    }

    return (
        <CartContext.Provider 
            value={{ cart, addToCart, totalProducts, removeItem, incrementItem, decrementItem, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}


export default CartContext

