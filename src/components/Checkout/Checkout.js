import { useContext, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import CartContext from "../context/CartContext"

const Checkout = () => {
    const { cart } = useContext(CartContext)
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    
    console.log(user)
    return (
        <div className="container">
            <h1>checkout</h1>
        </div>
    )
}

export default Checkout