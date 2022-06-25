import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Checkout.css'
import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import CartContext from "../context/CartContext"
import { Alert, AlertTitle, Box, Button, Link, Breadcrumbs, Typography } from "@mui/material";
import { updateDataProfile, getProfile, saveOrder } from "../../services/firebase/queries";
import ClipLoader from "react-spinners/ClipLoader";
import moment from 'moment';
import 'moment-timezone'
import 'moment/locale/es';

const Checkout = () => {
    const { cart, totalPrice, clear } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    const [address, setAddress] = useState("")
    const [postal, setPostal] = useState("")
    const [phone, setPhone] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [dataMissing, setDataMissing] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setLoading(true)
            getProfile(user.uid)
                .then(data => {
                    const [profile] = data;

                    setAddress(profile.address)
                    setPostal(profile.postal)
                    setPhone(profile.phone)

                    if (profile.address == "" || profile.postal == "" || profile.phone == "") {
                        setDataMissing(true)
                    }

                    setLoading(false)
                })
        }

        if (!user) {
            navigate("/", + { replace: true })
        }

        if(cart.length == 0) {
            navigate("/", + { replace: true })
        }


    }, [])


    const update = () => {
        setIsEditing(false);
        updateDataProfile(user.uid, address, postal, phone)
        toast.success(' Bien ! Tus datos se guardaran en tu cuenta para futuras compras ✨!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        });
    }

    const continuePayment = async () => {
        const localLocale = moment();
        localLocale.locale('es-mx');
     
        if (isEditing) {
            toast.error(' Aegurate de haber actualizado los datos antes de continuar 🚧!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });

            return
        }

        const objOrder = {
            buyer: {
                user: user.displayName,
                userId: user.uid,
                email: user.email,
                phone: phone,
                address: address,
                postal: postal
            },
            items: cart,
            total: totalPrice(),
            time : localLocale.format('LL')
        }

        try {
            const id = await saveOrder(objOrder)
            clear();
            navigate(`/success/?orderId=${id}`)
        } catch (err) {
            console.log(err)
        }

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


    useEffect(() => {
        if (address == "" || postal == "" || phone == "") {
            setDataMissing(true)
        } else {
            setDataMissing(false)
        }
    }, [address, postal, phone])


    if(loading) {
        return <div className="container Checkout-loading">
           <ClipLoader className="loader"  loading={loading} size={180} />
        </div>
    }

    return (
        user && <div className="container Checkout">
            <Box m={2}>
                <Breadcrumbs aria-label='breadcumb'>
                    <Link underline = "hover" color="inherit">Carrito</Link>
                    <Link underline = "hover" color="inherit">Orden</Link>
                    <Typography >Proceso de pago</Typography>
                </Breadcrumbs>
            </Box>
            <Alert severity="info">
                <AlertTitle>Proceso de compra</AlertTitle>
                Usted esta cerca de completar su compra, pero, antes, <strong>termine de configurar su informacion de envio en el caso de que
                    aun no lo haya hecho o sus datos no sean correctos. La guardaremos por Usted
                    para sus futuras compras 🔥
                </strong>
            </Alert>
            <div className='Profile-form'>
                <h1>Datos de compra</h1>
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
                </form> <br />
                {
                    dataMissing && <Alert severity="error">
                        <AlertTitle>No has completado los datos necesarios para seguir con tu compra</AlertTitle>
                        Por favor, <strong>completa los datos faltantes para proceder</strong>
                    </Alert>
                }

                <div className='button-container'>
                    <Button variant="contained"
                        disabled={!isEditing}
                        className="update-button"
                        onClick={update}>Actualizar</Button>
                </div>
            </div>
            <br />
            <Button variant="contained"
                disabled={dataMissing}
                className="next-button"
                onClick={continuePayment}>Continuar</Button>
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
    )
}

export default Checkout