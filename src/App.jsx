import React from 'react'

import './App.css';
import Navbar from "./components/Navbar/navbar";
import Homepage from './components/Homepage/Homepage';
import ProductsPage from './components/Products/ProductsPage';
import SingleProductPage from './components/SingleProduct/SingleProductPage';
import CartPage from './components/Cart/CartPage';
import MyOrderPage from './components/MyOrder/MyOrderPage';

const App = () => {
  return (
    <div className='App'>
      <Navbar/>
      <main>
        {/* <Homepage/> */}
        {/* <ProductsPage/> */}
        {/* <SingleProductPage/> */}
        {/* <CartPage/> */}
        <MyOrderPage/>
      </main>
    </div>

  )
}

export default App