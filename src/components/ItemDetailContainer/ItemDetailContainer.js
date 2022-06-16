import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from '../../asyncmock'
import ItemDetail from "../ItemDetail/ItemDetail"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebase"

const ItemDetailContainer = () => {
    const [item, setItem] = useState()

    const { productId } = useParams()

    useEffect(() => {

        getDoc(doc(db, "products", productId))
            .then(response => {
                const product = { id: response.id, ...response.data()}
                console.log(product)
                setItem(product)
            })
    }, [productId])

    return (
        <div className="ItemDetailContainer">
            { item && <ItemDetail item = {item} />}
            
        </div>
    )
}

export default ItemDetailContainer