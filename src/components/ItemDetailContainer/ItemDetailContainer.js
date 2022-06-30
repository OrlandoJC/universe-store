import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { ClipLoader } from "react-spinners"
import { getProductById } from "../../services/firebase/queries"

const ItemDetailContainer = () => {
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)

    const { productId } = useParams()

    useEffect(() => {
        setLoading(true)
        getProductById(productId)
            .then(response => {
                const product = { id: response.id, ...response.data() }

                if (!response.data()) {
                    setItem(null)
                } else {
                    setItem(product)
                }

                setLoading(false)
            })
    }, [productId])

    if (loading) {
        return <div className=" container Checkout-loading">
            <ClipLoader className="loader" loading={loading} size={180} />
         </div>
    } else {
        if (!item) {
            return (
                <div className="" style={
                    {
                        display: "flex",
                        alignItems: "center",
                        flexFlow: "column",
                        backgroundColor: "lavender",
                        justifyContent: "center",
                        flexGrow: 1,
                        color: "#191970c7",
                        paddingBottom:"100px"
                    }}>
                    <img src="/images/search.png" style={{ textAlign: "center" }} width="660" alt="" />
                    <h1>El producto que buscas no existe</h1>
                </div>
            )
        } else {
            return (
                <div className="ItemDetailContainer container">
                    {<ItemDetail item={item} />}
                </div>
            )
        }
    }



}

export default ItemDetailContainer