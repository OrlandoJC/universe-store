import Item from "../Item/Item"
import './ItemList.css'
const ItemList = ({items}) => {
    return (
        <div className="ItemList"> 
            {
                items.map(product => <Item key = {product.id }item = {product}/>)
            }
        </div>
    )
}

export default ItemList