import { useEffect, useState } from "react"
import './ItemListContainer.css'
import { getProducts, getProductsByCategory } from "../../asyncmock"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])

    const {categoryId } = useParams()

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
        <div className="ItemListContainer">
            <ItemList items={products}/>
        </div>
    )
}

export default ItemListContainer