import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'
import { useContext, useEffect, useRef, useState } from "react"
import { Navigate, useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import { getProfile, updateDataProfile } from '../../services/firebase/queries'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Upload } from 'upload-js';
import { IoEye } from "react-icons/io5";
import { BiPencil } from 'react-icons/bi'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Profile = () => {
    const { user, updateImageProfile, setProfileUpdate } = useContext(AuthContext)
    const [address, setAddress] = useState("")
    const [postal, setPostal] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [orders, setOrders] = useState([])
    const [updatingProfilePic, setUpdatingProfilePic] = useState(false)
    const toastId = useRef(null);

    const notify = (message) => toastId.current = toast.loading(message, { autoClose: false });

    const updateAlert = (message) => toast.update(toastId.current, {
        render: message,
        type: "success",
        autoClose: 5000,
        className: 'rotateY animated',
        delay:1000,
        isLoading:false,
        closeButton:true
    });

    let navigate = useNavigate()

    useEffect(() => {
        if (user) {
            getProfile(user.uid)
                .then(data => {
                    const [profile, orders] = data;

                    setAddress(profile.address)
                    setPostal(profile.postal)
                    setPhone(profile.phone)
                    setImage(user.providerData[0].photoURL)
                    setOrders(orders)

                    if (profile.address == "" || profile.postal == "" || profile.phone == "") {
                        console.log("actualiza tus datos")
                    }
                })
        }

    }, [user, image])

    const update = () => {
        setIsEditing(false);
        updateDataProfile(user.uid, address, postal, phone)
        toast.success('🦄  Datos actualizados !', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    const edit = (field, value) => {
        setIsEditing(true)

        if (field === "address")
            setAddress(value)

        if (field === "phone")
            setPhone(value)

        if (field === "postal")
            setPostal(value)
    }

    const changePhoto = async (event) => {
        const upload = new Upload({ apiKey: "public_kW15asJ8y4jh1mJAuGaN9dQTU9Zo" });
        const [file] = event.target.files;

        setUpdatingProfilePic(true)
        notify("Cambiando foto de perfil...")

        upload.uploadFile(file)
            .then(({ fileUrl }) => {
                updateImageProfile(fileUrl);
                setImage(fileUrl)
                setProfileUpdate(true)
                setUpdatingProfilePic(true)
                updateAlert("Foto de perfil cambiada 😍")
            })

        setProfileUpdate(true)
    }

    if (!user) {
        return navigate("/", + { replace: true })
    }

    return (
        <div className="container Profile">
            <div className='Profile-image'>
                <div className='Profile-container'>

                    <img src={user ? user.photoURL : ""} width={180} height={180} style={{ objectFit: "cover" }}></img>
                    <input type="file" name="file" id="file" className="inputfile" onChange={changePhoto} />
                    <label htmlFor="file" className='input-file'><BiPencil className='input-icon' /></label>
                </div>
                <div className='Profile-resume'>
                    <span className='name'><b>{user.displayName}</b> </span>
                    <br />
                    <span className='email'><b>{user.email}</b> </span>
                </div>
            </div>
            <div className='Profile-form'>
                <h2>Configuracion de Cuenta</h2>
                <form>
                    <label> <b>Nombre</b> </label>
                    <input type="text" disabled={true} value={user.displayName}></input>
                    <label> <b> Correo</b></label>
                    <input type="text" disabled={true} value={user.email} size={user.email.length}></input>
                    <br />
                    <br />
                    <label><h3>Datos de envio</h3></label> <br />
                    <label><b>Direccion</b></label>
                    <input type="text"
                        value={address}
                        onChange={(e) => { edit("address", e.target.value) }}></input>
                    <label> <b>Codigo Postal</b></label>
                    <input
                        type="text"
                        value={postal}
                        onChange={(e) => { edit("postal", e.target.value) }}></input><br /><br />
                    <label> <b>Telefono</b></label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => { edit("phone", e.target.value) }}></input>
                </form>
                <div className='button-container'>
                    <Button variant="contained"
                        disabled={!isEditing}
                        className="update-button"
                        onClick={update}>Actualizar</Button>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover
                    />
                </div>
            </div>
            <div className='Profile-orders'>
                <h2> Mis pedidos </h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell> <b>ID de compra</b></TableCell>
                                <TableCell> <b>Fecha</b> </TableCell>
                                <TableCell> <b>Precio Total</b></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell >{row.data.time}</TableCell>
                                        <TableCell >{row.data.total + " MXN"}</TableCell>
                                        <TableCell align='center'> <Link to={`/orders/${row.id}`} state={{ order: row, orders: orders }}> Ver pedido</Link></TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Profile