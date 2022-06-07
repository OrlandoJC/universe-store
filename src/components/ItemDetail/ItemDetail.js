import './ItemDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ItemCount from '../ItemCount/ItemCount'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ItemDetail = ({item}) => {
    const [quantity, setQuantity] = useState(0)

    const handleAdd = (elements) => {
        setQuantity(elements)
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
                    <span className='text--bold'>${item.price}</span>
                    <span> 1 producto </span>
                </div>

                <div className='reviews details'>
                    <span>
                        <FontAwesomeIcon icon={faStar} className="icon--review"/>
                        <FontAwesomeIcon icon={faStar} className="icon--review"/>
                        <FontAwesomeIcon icon={faStar} className="icon--review"/>
                    </span>
                    <span>10 opiniones</span>
                </div>
                { quantity > 0 ? <Link to = "/cart" className='button__pay'>Pagar {quantity} productos</Link> : <ItemCount stock={5} initial= {0} onAdd = {handleAdd}/>}
              
            </div>
        </div>
    )
}

export default ItemDetail