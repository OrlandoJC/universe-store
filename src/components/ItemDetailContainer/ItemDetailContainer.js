import { useEffect, useState } from "react"
import { getProduct } from '../../asyncmock'
import ItemDetail from "../ItemDetail/ItemDetail"

const ItemDetailContainer = () => {
    const [item, setItem] = useState({})

    useEffect(() => {
        getProduct(1)
            .then((result) => {
                setItem(result)
                console.log(result)
            })
    }, [])


    return (
        <div className="ItemDetailContainer">
            <ItemDetail item = {item} />
        </div>
    )
}

export default ItemDetailContainer