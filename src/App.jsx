import React, { useEffect, useState, useCallback, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Routing from "./components/Routing/Routing";
import { getJWt, getUser } from "./services/userServices";
import setAuthToken from "./Utils/setAuthToken";
import {
  addToCartAPI,
  getCartAPI,
  increaseProductAPI,
  decreaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./contexts/CartContext";

// 🟢 Import the new reducer file (adjust relative path if necessary)
import cartReducer from "./reducers/cartReducer";

setAuthToken(getJWt());

const App = () => {
  const [user, setUser] = useState(null);

  // 🟢 Wire the imported reducer directly into the hook configuration
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Sync Initial LocalStorage Cart State On Mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  // Persist Cart Changes Automatically to LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Authenticate User Session & Monitor Token Expiry
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  // Add Items to Cart
  const addToCart = useCallback((product, quantity) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });

    addToCartAPI(product._id, quantity)
      .then(() => {
        toast.success("Product Added Successfully");
      })
      .catch(() => {
        toast.error("Failed to add product");
      });
  }, []);

  // Remove Items from Cart Instantly
  const removeFromCart = useCallback((id) => {
    const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });

    removeFromCartAPI(id).catch(() => {
      toast.error("Something went wrong!");
      dispatch({ type: "SET_CART", payload: oldCart });
    });
  }, []);

  // Update Item Quantity with Network Rollback Handles
  const updateCart = useCallback((type, id) => {
    const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch({ type: "UPDATE_QUANTITY", payload: { type, id } });

    if (type === "increase") {
      increaseProductAPI(id).catch(() => {
        toast.error("Something went wrong!");
        dispatch({ type: "SET_CART", payload: oldCart });
      });
    } else if (type === "decrease") {
      decreaseProductAPI(id).catch(() => {
        toast.error("Something went wrong!");
        dispatch({ type: "SET_CART", payload: oldCart });
      });
    }
  }, []);

  // Fetch Cart from Server
  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
        dispatch({ type: "SET_CART", payload: res.data });
      })
      .catch(() => {
        toast.error("Something went wrong while fetching the cart!");
      });
  }, []);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user, getCart]);

  // Wrapper function to match standard context API specifications
  const setCartWrapper = useCallback((newCartArray) => {
    dispatch({ type: "SET_CART", payload: newCartArray });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          updateCart,
          setCart: setCartWrapper,
        }}
      >
        <div className="App">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
