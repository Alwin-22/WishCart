import React from "react";
import "./QuantityInput.css";
const QuantityInput = ({ quantity, setQuantity, stock, inCart, productId }) => {
  return (
    <div className="quantity_input align_center">
      <button
        className="quantity_input_button"
        disabled={quantity <= 1}
        onClick={() => {
          inCart
            ? setQuantity("decrease", productId)
            : setQuantity(quantity - 1);
        }}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        disabled={quantity >= stock}
        className="quantity_input_button"
        onClick={() => {
          inCart
            ? setQuantity("increase", productId)
            : setQuantity(quantity + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
