import './Item.css'

const Item = ({item}) => {
    return (
        <div className="Item">
            <img alt = {item.description} src={item.pictureUrl}></img>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
            <p>$ {item.price}</p>
        </div>
    )
}

export default Item;