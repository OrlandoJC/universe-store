import { useEffect, useState } from "react"
import './ItemListContainer.css'
import { getProducts, getProductsByCategory } from "../../asyncmock"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"

import { getDocs, collection, query, where } from "firebase/firestore"
import { db } from "../../services/firebase"

import { Alert, AlertTitle, Box, Button, Link, Breadcrumbs, Typography } from "@mui/material";
import { HashLoader } from "react-spinners"


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
        return <div className="container Checkout-loading">
           <HashLoader className="loader"  loading={loading} size={50} />
        </div>
    } else {
        return (
            <div className="ItemListContainer container">
                {
                    categoryId && <Box m={2}>
                        <Breadcrumbs aria-label='breadcumb'>
                            <Link underline="hover" color="inherit">Inicio</Link>
                            <Link underline="hover" color="inherit">{categoryId  + 's'}</Link>
                        </Breadcrumbs>
                    </Box>
                }
                <ItemList items={products} />
            </div>
        )
    }

}

export default ItemListContainer