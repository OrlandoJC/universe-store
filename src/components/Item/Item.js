import './Item.css'

const Item = ({item}) => {
    return (
        <div className="Item">
            <img alt = {item.description} src={item.pictureUrl}></img>
            <div className='Item__detail'>
                <span className='Item__title'>{item.title}</span>
                <p> {item.description}</p>
                <p>$ {item.price}</p>
            </div>  
        </div>
    )
}

export default Item;