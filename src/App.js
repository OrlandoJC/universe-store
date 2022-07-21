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
import Success from './components/Success/Success';
import Footer from './components/Footer/Footer';
import OrdersHistory from './components/OrdersHistory/OrdersHistory';
import RequireAuth from './components/context/RequireAuth';
import PageError from './components/PageError/PageError';
import WishList from './components/WishList.js/WishList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <CartContextProvider>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<ItemListContainer />} />
              <Route exact path='/category/:categoryId' element={<ItemListContainer />} />
              <Route exact path='/item/:productId' element={<ItemDetailContainer />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/profile' element={<RequireAuth> <Profile /></RequireAuth>} />
              <Route exact path='/checkout' element={<Checkout />} />
              <Route exact path='/success/' element={<Success />} />
              <Route exact path='/WishList/' element={<WishList />} />
              <Route exact path='/orders/:orderId' element={<RequireAuth><OrdersHistory /></RequireAuth>} />
              <Route exact path='*' element={<PageError />} />
            </Routes>
            <Footer />
          </CartContextProvider>
        </AuthContextProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
