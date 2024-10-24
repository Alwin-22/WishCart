import React from 'react'

import './App.css';
import Navbar from "./components/Navbar/navbar";
import Homepage from './components/Homepage/Homepage';
import ProductsPage from './components/Products/ProductsPage';
import SingleProductPage from './components/SingleProduct/SingleProductPage';

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <main>
        {/* <Homepage/> */}
        {/* <ProductsPage/> */}
        <SingleProductPage/>
      </main>
    </div>

  )
}

export default App