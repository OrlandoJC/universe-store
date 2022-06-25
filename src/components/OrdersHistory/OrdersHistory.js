import './OrdersHistory.css'
import { BiTimeFive } from 'react-icons/bi'
import { Divider, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {IoChevronBackOutline} from 'react-icons/io5'

const OrdersHistory = () => {
    const { productId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [orders, setOrders ] = useState([])

    useEffect(() => {
        if (location.state) {
            setOrder(location.state.order)
        } else {
            navigate("/profile")
        }
    }, [location.state])

    return (order && <div className="OrdersHistory_container">
        <div className="OrdersHistory">
            <div className="panel_history">
                <span ><BiTimeFive style={{ fontSize: "2rem" }} /> </span>
                <h3 style={{fontSize:"16px"}}>Historial de orden</h3>

                <div className="list_orders">
                <h4>Esta viendo el historial de pedido del</h4>

                    <span className="order_item">
                        {order.data.time}
                    </span>
                </div>

                <span className='back-link'> <Link to = "/profile"><IoChevronBackOutline /> Mi cuenta</Link> </span>

            </div>
            <div className="panel_detail">
                <div className="detail_nabvar">
                    <div className="order_detail-element button--dark">
                        Detalles de orden
                    </div>
                    <div className="order_detail-element">
                        <span className='subtitle_panel'>Numero de orden</span>
                        <p>{order.id}</p>
                    </div>
                    <div className="order_detail-element">
                        <span className='subtitle_panel'>Total</span>
                        <p> $ {order.data.total}</p>
                    </div>
                    <div className="order_detail-element">
                        <span className='subtitle_panel'>Fecha</span>
                        <p>{order.data.time}</p>
                    </div>
                </div>
                <div className="detail_items">
                    <div className="divider">
                        <Divider className='divider-text'> {order.data.time} </Divider>
                    </div>


                    <Grid container spacing={1}>
                        {
                            order.data.items.map(orderItem => (
                                <Grid item xs={4} >
                                    <div className="card_history">
                                        <img src={orderItem.pictureUrl} alt="" />
                                        <div className="card_description">
                                            <h4> {orderItem.title}</h4>
                                            <div className="card_footer">
                                            <span>$ <b>{orderItem.price} x {orderItem.quantity}</b></span>
                                            <span className='description-button'> REORDENAR</span>
                                            </div> 
                                        </div>
                                    </div>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>

        </div>

    </div>
    )
}

export default OrdersHistory