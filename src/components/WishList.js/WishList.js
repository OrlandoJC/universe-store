import './WishList.css'
import { Button, Breadcrumbs, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Typography, Pagination, Avatar } from "@mui/material"
import { Link } from "@mui/material"
import { AiOutlineHeart } from 'react-icons/ai'
import { MdDeleteOutline } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { getFavorites } from '../../services/firebase/queries'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { IconContext } from 'react-icons/lib'

const WishList = () => {
    const { user } = useContext(AuthContext)
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        if(user) {
            setLoading(true)
            getFavorites(user.uid, page)
                .then(favorites => {
                    setFavorites(favorites)
                    console.log(favorites)
                    setLoading(false)
                })
        }
    }, [page])

    if (loading) {
        return (<h1>Cargando</h1>)
    }

    if(!user) {
        return (
            <div className="WishList container" style={{display:"flex", flexFlow:"column", alignItems:"center"}}>
                <h2>Entra o registrate para guardar tus favoritos 🤖</h2>
                <img width = "400" src="./images/access.png" alt="" />
            </div>
        )
    }
    return (
        <div className="WishList container">
            <div className="WishList-header">
                <Breadcrumbs aria-label='breadcumb'>
                    <Link underline="hover" color="inherit">Home</Link>
                    <Link underlines="hover" color="inherit"> WishList</Link>
                </Breadcrumbs>
                <div >
                    <AiOutlineHeart className="WishList-icon" />
                </div>
                <h1>Mis lista de deseos</h1>
            </div>
            <div className="WishList-table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> <b>Imagen</b></TableCell>
                                <TableCell> <b>Nombre del producto</b></TableCell>
                                <TableCell> <b>Precio Unitario</b> </TableCell>
                                <TableCell> <b>Stock</b></TableCell>
                                <TableCell></TableCell>
                                <TableCell> <b>Borrar</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                favorites.map(({ data }) => (
                                    <TableRow
                                        key={data.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Avatar
                                                alt={data.descriptionText}
                                                src={data.pictureUrl}
                                                sx={{ width: 60, height: 60 }} />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {data.title}
                                        </TableCell>
                                        <TableCell >{data.price}</TableCell>
                                        <TableCell >{data.stock} </TableCell>
                                        <TableCell align='center'> <Button variant="contained">Añadir al carrito</Button></TableCell>
                                        <TableCell >
                                            <IconContext.Provider value={{ size: "1.7rem", className: "global-class-name" }}>
                                                <MdDeleteOutline />
                                            </IconContext.Provider>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer><br />
                <Stack spacing={2}>
                    <Pagination count={Math.ceil(favorites.length / 10)} page={page} onChange={handleChange} color="primary" />
                </Stack>
            </div>
        </div>
    )
}

export default WishList