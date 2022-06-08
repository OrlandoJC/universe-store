import { createContext, useState } from "react";


const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const isInCart = (id) => {
        return cart.some(product => product.id === id)
    }

    const addToCart = (item, quantity) => {
        if(isInCart(item.id)) {
            const newCart = cart.map(
                product => {
                    if(product.id === item.id) {
                        return {...product, quantity : product.quantity + quantity}
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
        return cart.filter(product => product.id !== id)
    }

    const totalProducts = () => {
        return cart.reduce((acc, curr) => acc + curr.quantity, 0)
    }

    const clear = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, totalProducts }}>
            {children}
        </CartContext.Provider>
    )
}


export default CartContext

