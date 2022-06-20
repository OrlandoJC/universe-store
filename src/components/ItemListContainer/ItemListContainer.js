import { useEffect, useState } from "react"
import './ItemListContainer.css'
import { getProducts, getProductsByCategory } from "../../asyncmock"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

import { getDocs, collection, query, where } from "firebase/firestore"
import { db } from "../../services/firebase"

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true);

        const collectionRef = categoryId
            ? query(collection(db, "products"), where("category", "==", categoryId))
            : collection(db, "products")

        getDocs(collectionRef)
            .then(response => {
                const products = response.docs.map(doc => {
                    return { id: doc.id, ...doc.data() }
                })
                setProducts(products)
                setLoading(false);
            }).catch(err => {
                console.log(err)
            }).finally(() => {
            })

    }, [categoryId])

    if (loading) {
        return (
            <h1>Cargando...</h1>
        )
    } else {
        return (
            <div className="ItemListContainer container">
                <ItemList items={products} />
            </div>
        )
    }

}

export default ItemListContainer