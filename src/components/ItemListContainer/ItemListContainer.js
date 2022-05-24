import ItemCount from "../ItemCount/ItemCount"

const ItemListContainer = ({greeting}) => {
    return (
        <div className="container">
            <ItemCount initial={0} stock={10} />
        </div>
    )
}

export default ItemListContainer