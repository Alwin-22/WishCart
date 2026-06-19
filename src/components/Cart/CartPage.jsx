import React, { useEffect, useState, useContext } from "react";

import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import "./CartPage.css";
import Table from "./../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import { checkoutAPI } from "../../services/orderServices";
import { toast } from "react-toastify"; // 🟢 Fixed potential typo path from unstyled

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const user = useContext(UserContext);

  // 🟢 1. Extracted 'setCart' from context so it is defined for the checkout function
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order placed successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
  };

  return (
    <section className="cart_page align_center">
      <div className="align_center user_info">
        <img
          src={`http://localhost:5000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name : {user?.name}</p>
          <p className="user_email">Email : {user?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  inCart={true} 
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>${subTotal > 0 ? 5 : 0}</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal > 0 ? subTotal + 5 : 0}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
