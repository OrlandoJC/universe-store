import './Item.css'
import { Link } from 'react-router-dom';

const Item = ({item}) => {
    console.log(`/item/${item.id}`)

    return (
        <div className="Item">
            <img alt = {item.description} src={item.pictureUrl}></img>
            <div className='Item__detail'>
                <span className='Item__title'>{item.title}</span>
                <p> {item.description}</p>
                <p>$ {item.price}</p>
                 <span className='button--open'> <Link to = {`/item/${item.id}`} >Ver detalle</Link>    </span>
            </div>  
        </div>
    )
}

export default Item;