import { useEffect, useState } from "react"
import './ItemListContainer.css'
import ItemCount from "../ItemCount/ItemCount"
import { getProducts, getProductsByCategory } from "../../asyncmock"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    const {categoryId } = useParams()
    console.log(categoryId)
    useEffect(() => {
        if (!categoryId) {
            getProducts()
                .then(data => {
                    setProducts(data)
                })
        } else {
            getProductsByCategory(categoryId)
                .then(data => {
                    setProducts(data)
                })
        }
        
    }, [categoryId])

    return (
        <div className="container ItemListContainer">
            <h1 className="title">Productos</h1>
            <ItemList items={products}/>
            {/* <ItemCount initial={0} stock={10} /> */}
        </div>
    )
}

export default ItemListContainer