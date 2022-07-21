import './ItemListContainer.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Link, Breadcrumbs } from "@mui/material";
import { HashLoader } from "react-spinners"
import { getByCategory } from '../../services/firebase/queries'
import ItemList from "../ItemList/ItemList"

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading]   = useState(true)
    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true);

        getByCategory(categoryId)
            .then(response => {
                const products = response.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setProducts(products)
                setLoading(false);
                console.log(products)
            }).catch(err => {

            }).finally(() => {

            })
    }, [categoryId])

    if (loading) {
        return <div className="container Checkout-loading">
            <HashLoader className="loader" loading={loading} size={50} />
        </div>
    } else {
        return (
            <div className="ItemListContainer container">
                {
                    categoryId && <Box m={2}>
                        <Breadcrumbs aria-label='breadcumb'>
                            <Link underline="hover" color="inherit">Inicio</Link>
                            <Link underline="hover" color="inherit">{categoryId + 's'}</Link>
                        </Breadcrumbs>
                    </Box>
                }
                <ItemList items={products} />
            </div>
        )
    }

}

export default ItemListContainer