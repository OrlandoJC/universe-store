import './ItemDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ItemCount from '../ItemCount/ItemCount'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import CartContext from '../context/CartContext'


const ItemDetail = ({ item }) => {
    const [quantity, setQuantity] = useState(0)
    const { cart, addToCart } = useContext(CartContext)
    const { id, title, price, pictureUrl, stars, stock} = item;

    const handleAdd = (quantity) => {
        setQuantity(quantity)
        addToCart({ id, title, price, pictureUrl }, quantity)
    }

    return (
        <div className="ItemDetail">
            <div className="ItemDetail__image">
                <div className='ItemDetail__big'>
                    <img src={item.pictureUrl}></img>
                </div>
                <div className='ItemDetail__thumbs'>
                    <img src={item.pictureUrl}></img>
                    <img src={item.pictureUrl}></img>
                    <img src={item.pictureUrl}></img>
                </div>
            </div>
            <div className="ItemDetail__information">
                <span className='type__product'>Sport products</span>
                <h1 className='title'>{item.title}</h1>
                <span className='text--subtitle'>Detalles</span>

                <p className='text--description'> {item.descriptionText}</p>

                <div className='price details'>
                    <span className='text--bold'>$ {item.price}.00 </span>
                    <span> 1 producto </span>
                </div>

                <div className='reviews details'>
                    <span>
                        {
                            [...Array(stars)].map(
                                (star, index) => <FontAwesomeIcon key={index} icon={faStar} className="icon--review" />
                            )
                        }
                    </span>
                    <span>10 opiniones</span>
                </div>
                { quantity > 0 
                    ? <Link 
                        to={ "/cart"} 
                        className='button__pay'> Ir al carrito</Link> 
                    : <ItemCount stock={stock} initial={0} onAdd={handleAdd} /> }

                <span className='ItemDetail-favoritos'>Favoritos 😍</span>
            </div>
        </div>
    )
}

export default ItemDetail