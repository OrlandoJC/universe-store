import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element = { <ItemListContainer />} />
          <Route exact path='/category/:categoryId' element = { <ItemListContainer />} />
          <Route exact path='/item/:productId' element = { <ItemDetailContainer />} />
          <Route exact path='*' element = {<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
