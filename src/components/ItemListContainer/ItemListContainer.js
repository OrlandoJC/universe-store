import { useEffect, useState } from "react"
import './ItemListContainer'
import ItemCount from "../ItemCount/ItemCount"
import getProducts from "../../asyncmock"
import ItemList from "../ItemList/ItemList"

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then(data => {
                setProducts(data)
            })
    }, [])

    return (
        <div className="container ItemListContainer">
            <ItemList items={products}/>
            <ItemCount initial={0} stock={10} />
        </div>
    )
}

export default ItemListContainer