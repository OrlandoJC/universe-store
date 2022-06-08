import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from '../../asyncmock'
import ItemDetail from "../ItemDetail/ItemDetail"

const ItemDetailContainer = () => {
    const [item, setItem] = useState()

    const { productId } = useParams()

    useEffect(() => {
        getProduct(parseInt(productId))
            .then((result) => {
                setItem(result)
            })
    }, [])

    return (
        <div className="ItemDetailContainer">
            { item && <ItemDetail item = {item} />}
            
        </div>
    )
}

export default ItemDetailContainer