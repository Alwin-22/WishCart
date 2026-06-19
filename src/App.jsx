import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Routing from "./components/Routing/Routing";
import { date } from "zod";
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

setAuthToken(getJWt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const productId = product._id;

      const existingItem = prevCart.find(
        (item) => item.product._id === productId,
      );

      if (existingItem) {
        // update quantity
        return prevCart.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // add new item
      return [...prevCart, { product, quantity }];
    });
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Successfully");
      })
      .catch((err) => {
        toast.error("Failed to add product");
        setCart(cart);
      });
  };
  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id,
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }

    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);
      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
    }
  };
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
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
