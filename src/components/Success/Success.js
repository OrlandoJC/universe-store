import './Success.css'
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from '../context/authContext';

const Success  = () => {
    const [searchParams] = useSearchParams()
    const [order, setOrder] = useState()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (searchParams.get("orderId") && user) {
            const orderId = searchParams.get("orderId") 
            setOrder(orderId)
        } 
        
        if(!user){
            navigate("/", { replace: true })
        }
    }, [searchParams])

    return (
        user && <div className='container Success'>
            <h1>Gracias por tu compra, {user.displayName} 😎</h1>
            <h2>Esperamos que vuelvas pronto</h2>
            <span>Tu orden tiene el id : <b>{order}</b> (tambien puedes verlo en tu perfil)</span>
            <img className = "Success-image" src="/images/success.png"/>
        </div>
    )
}

export default Success;