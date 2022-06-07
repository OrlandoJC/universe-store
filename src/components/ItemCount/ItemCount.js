import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ stock, initial, onAdd }) => {
    const [items, setItems] = useState(initial)

    const onIncrement = (event) => {
        if (items < stock) setItems(items + 1)
    }

    const onDecrement = (event) => {
        if (items > 0) setItems(items - 1)
    }

    const onAddToCart = () => {
        if (items != stock) {
            onAdd(items)
        }
    }
    return (
        <div className='ItemCount'>
            <div className='Item-controls'>
                <button className='counter-button' onClick={onDecrement}>-</button>
                <span className='counter--items'> {items}</span>
                <button className='counter-button' onClick={onIncrement}>+</button>
            </div>
            <div className='Item--button'>
                <span className='addTocart--button' onClick={onAddToCart}>Añadir al carrito</span>
            </div>
        </div>
    )
}

export default ItemCount