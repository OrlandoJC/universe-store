import './Item.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-regular-svg-icons'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { updateFavorites } from '../../services/firebase/queries';
import { FaHeart, FaRegHeart} from 'react-icons/fa'

const Item = ({ item }) => {
    const {user} = useContext(AuthContext)

    const addTofavorite = () => {
        console.log(user.uid)
        updateFavorites(user.uid, item.id)
    }

    return (
        <div className="Item">
            <span className='icon__favorite'><FaRegHeart className="icon" style ={{color:"red"}} onClick={addTofavorite}/></span>
            <img alt={item.description} src={item.pictureUrl}></img>
            <div className='Item__detail'>
                <span style={{ color: "red" }} className="Item__tag">Sport product</span>
                <span className='Item__title'>{item.title}</span>
                <p className='Item__description'> {item.description}</p>
                <p className='Item__price'>$ {item.price} MXN</p>
                <span className='button--open'> <Link to={`/item/${item.id}`} >Ver detalle ✨</Link>    </span>
                <FontAwesomeIcon icon="fa-solid fa-heart" />
                
            </div>
        </div>
    )
}

export default Item;