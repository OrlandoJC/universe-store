import './ItemDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ItemDetail = ({item}) => {
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
              
            </div>
        </div>
    )
}

export default ItemDetail