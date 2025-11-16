import { Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "../Homepage/Homepage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import Logout from "../Authentication/Logout";

const Routing = ({ setUser }) => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage User={setUser} />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/myorders" element={<MyOrderPage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default Routing;
