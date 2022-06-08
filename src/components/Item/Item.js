import './Item.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons'


const Item = ({item}) => {
    console.log(`/item/${item.id}`)

    return (
        <div className="Item">
            <span className='icon__favorite'><FontAwesomeIcon icon={faHeart}  className="icon"/></span>
            <img alt = {item.description} src={item.pictureUrl}></img>
            <div className='Item__detail'>
                <span style={ {color: "red"}} className="Item__tag">Sport product</span>
                <span className='Item__title'>{item.title}</span>
                <p className='Item__description'> {item.description}</p>
                <p className='Item__price'>$ {item.price} MXN</p>
                 <span className='button--open'> <Link to = {`/item/${item.id}`} >Ver detalle</Link>    </span>
            </div>  
        </div>
    )
}

export default Item;