
import { useContext, useState } from "react";
import CartContext from "../context/CartContext";

const CartItem = ({ item }) => {
    const { pictureUrl, title, price, quantity, id } = item;
    const { removeItem, incrementItem, decrementItem } = useContext(CartContext)

    const onAddItem = () => {
        incrementItem(id)
    }

    const onQuitItem = () => {
        if (quantity > 1)
            decrementItem(id)
        if (quantity === 1) {
            removeItem(id)
        }
    }

    const onDeleteItem = () => {
        removeItem(id)
    }

    return (
        <div className='Cart__item'>
            <img className='Cart__image' src={pictureUrl} height={130} />
            <div className='Item__resumen'>
                <h2>{title}</h2>
                <span className='Item__description'>Black</span>
                <span className='Item__description'>Medium</span>
            </div>
            <div className='price'>
                <span> <b>{price} MXN</b></span>
            </div>
            <div className='edit'>
                <div className='controls'>
                    <button className='control__button' onClick={onQuitItem}>-</button>
                    <span className='control__counter'>{quantity}</span>
                    <button className='control__button' onClick={onAddItem}>+</button>
                </div>
            </div>
            <div className='delete'>
                <button className='delete__button' onClick={onDeleteItem}>X</button>
            </div>
        </div>
    )
}


export default CartItem