
import './Footer.css'
import { Grid } from '@mui/material';
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className="Footer">
            <div className="container Footer_container">
                <div className="Footer_info">
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <ul className='list_options uppercased'>
                                <li>Buscar en la tienda</li>
                                <li>Registrar al newsletter</li>
                                <li>Hazte miembro</li>
                                <li>Envianos comentarios</li>
                            </ul>
                        </Grid>
                        <Grid item xs={4}>
                            <ul className='list_options'>
                                <li className='uppercased'>Obtener ayuda</li>
                                <li className='gray'>Pedidos</li>
                                <li className='gray'>Informacion de envios</li>
                                <li className='gray'>Opciones de pago</li>
                            </ul>
                        </Grid>
                        <Grid item xs={4}>
                            <ul className='list_options'>
                                <li className='uppercased'>Acerca de universe-store</li>
                                <li className='gray'>Noticias</li>
                                <li className='gray'>Terminos</li>
                                <li className='gray'>Sostenibilidad</li>
                            </ul>
                        </Grid>
                    </Grid>
                </div>
                <div className="Footer_social">
                    <BsFacebook />
                    <AiFillTwitterCircle />
                </div>
            </div>
            <div className="container Footer-footer">
                <div className="marks">
                    <FaMapMarkerAlt />
                    <span style={{display: "inline-block", marginLeft:"10px"}}>Mexico</span>
                    <span style={{display: "inline-block", marginLeft:"10px"}} className='gray'> © 2022 Universe Store, Inc. Todos los derechos reservados.</span>
                </div>
                <div className="terms">
                    <ul className='list-items'>
                        <li> Guias </li>
                        <li> Terminos de uso</li>
                        <li> Terminos de ventas</li> 
                        <li>Politica de privacidad y cookies</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;