import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar';
import CartContext, { CartContextProvider } from './components/context/CartContext';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import AuthContextProvider from './components/context/authContext';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<ItemListContainer />} />
              <Route exact path='/category/:categoryId' element={<ItemListContainer />} />
              <Route exact path='/item/:productId' element={<ItemDetailContainer />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/checkout' element={<Checkout />} />
              <Route exact path='*' element={<h1>Page not found</h1>} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;
