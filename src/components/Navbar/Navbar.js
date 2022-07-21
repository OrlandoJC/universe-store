import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import CartContext from '../context/CartContext'
import { AuthContext } from '../context/authContext'
import { Avatar } from '@mui/material'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../services/firebase'

const Navbar = () => {
    const { totalProducts } = useContext(CartContext)
    const { user, logOut } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [imageUpdated, setImageUpdated] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (user) {
            const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
                const profilePicture = doc.data().photoUrl;
                setImageUpdated(profilePicture)
            })

            return () => {
                unsub()
            }
        }
    }, [user])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        if (user)
            logOut()
        handleClose()
    }

    const total = totalProducts();

    return (
        <header className="header">
            <div className='message'>Envios a toda la republica mexicana  🛩️✈️</div>
            <div className="header__container container">
                <div className="logo">
                    <span ><Link to="/" className='logo__text'>  UNIVERSE-STORE  </Link> </span>
                </div>
                <div className='header__categories'>
                    <ul>
                        <li><Link to="/category/playera"> playeras </Link></li>
                        <li><Link to="/category/jersey"> jerseys </Link></li>
                        <li><Link to="/category/sudadera"> sudadera </Link></li>
                    </ul>
                </div>
                <div className="header__group">
                    <div className="header__bar">
                        <input className="hedaer__finder" id="search" type="text" placeholder="Buscar.." />
                        <button className="bar__search"><FontAwesomeIcon icon={faMagnifyingGlass} className="icon" /></button>
                        <span> <Link to="/wishlist"><FontAwesomeIcon icon={faHeart} className="icon" /></Link></span>
                        {
                            user
                                ? <span className="avatar">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={imageUpdated ? imageUpdated : user.photoURL}
                                        sx={{ width: 24, height: 24 }}
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    />
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}>
                                        <MenuItem onClick={handleClose}><Link to="/profile" className='icon-navbar'>Perfil</Link></MenuItem>
                                        <MenuItem onClick={onLogout}>Salir</MenuItem>
                                    </Menu>
                                </span>
                                : <span>
                                    <Link to="/login">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="icon"
                                        />
                                    </Link>
                                </span>}
                    </div>
                    <CartWidget items={total} />
                </div>
            </div>
        </header>
    )
}

export default Navbar