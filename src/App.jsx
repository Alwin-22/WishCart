import React, { useEffect, useState, useCallback, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Routing from "./components/Routing/Routing";
import { getJWt, getUser } from "./services/userServices";
import setAuthToken from "./Utils/setAuthToken";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./contexts/CartContext";

import cartReducer from "./reducers/cartReducer";
import useData from "./hooks/useData";
import useAddToCart from "./hooks/cart/useAddToCart";
import useRemoveFromCart from "./hooks/cart/useRemoveFromCart";
import useUpdateCart from "./hooks/cart/useUpdateCart";

setAuthToken(getJWt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const { data: cartData, refetch } = useData("/cart", null, ["cart"]);

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useUpdateCart();

  useEffect(() => {
    if (cartData) {
      const cartArray = Array.isArray(cartData)
        ? cartData
        : cartData.products || [];

      dispatch({ type: "SET_CART", payload: cartArray });
    }
  }, [cartData]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
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
        window.location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });

      addToCartMutation.mutate(
        { id: product._id, quantity: quantity },
        {
          onError: () => {
            toast.error("Something went wrong!");
            const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
            dispatch({ type: "SET_CART", payload: oldCart });
          },
        },
      );
    },
    [cart, addToCartMutation],
  );

  const removeFromCart = useCallback(
    (id) => {
      const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
      removeFromCartMutation.mutate(
        { id },
        {
          onError: () => {
            toast.error("Something went wrong!");
            dispatch({ type: "SET_CART", payload: oldCart });
          },
        },
      );
    },
    [removeFromCartMutation],
  );

  const updateCart = useCallback(
    (type, id) => {
      const oldCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch({ type: "UPDATE_QUANTITY", payload: { type, id } });

      updateCartMutation.mutate(
        { id, type },
        {
          onError: () => {
            toast.error("Something went wrong!");
            dispatch({ type: "SET_CART", payload: oldCart });
          },
        },
      );
    },
    [updateCartMutation],
  );

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
