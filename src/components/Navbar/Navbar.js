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
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Navbar = () => {
    const { cart, totalProducts } = useContext(CartContext)
    const { user, logOut } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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
            <div className='message'>Envios a toda la republica mexicana </div>
            <div className="header__container container">
                <div className="logo">
                    <span ><Link to="/" className='logo__text'> UNIVERSE-STORE </Link></span>
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
                        <span><FontAwesomeIcon icon={faHeart} className="icon" /></span>
                        {
                            user
                                ? <span className="avatar">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={user.providerData[0].photoURL}
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
                                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                        <MenuItem onClick={handleClose}>Mi Cuenta</MenuItem>
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