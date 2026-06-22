const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItem = state.find(
        (item) => item.product._id === product._id,
      );

      if (existingItem) {
        return state.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...state, { product, quantity }];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.product._id !== action.payload.id);

    case "UPDATE_QUANTITY":
      return state.map((item) => {
        if (item.product._id === action.payload.id) {
          const nextQuantity =
            action.payload.type === "increase"
              ? item.quantity + 1
              : item.quantity - 1;
          return { ...item, quantity: nextQuantity };
        }
        return item;
      });

    default:
      return state;
  }
};

export default cartReducer;
