import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  handleQuantity,
  inputQuantity,
  removeFromCart
} from "../services/userApi";

// Initial state of the cart
const initialState = {
  cart_details: [],
  loading: false,
  error: null
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartTotal(state, action) {
      // Update cart details and reset loading and error states
      state.cart_details = action.payload.cart_details;
      state.loading = false;
      state.error = null;
    },
    addToCartSuccess(state, action) {
      if (action.payload.Message) {
        // Parse the response to extract product details
        const messageParts = action.payload.Message.split(",");
        const productDetails = messageParts[0].split(" ");
        const id = productDetails[2];
        const prod_quantity = parseInt(messageParts[1].split(":")[1].trim());

        // Check if the item already exists in the cart
        const existingItemIndex = state.cart_details.findIndex(
          item => item.id === id
        );

        if (existingItemIndex >= 0) {
          // Update quantity for existing item
          state.cart_details[existingItemIndex].prod_quantity += prod_quantity;
        } else {
          // Add new item to the cart
          const newItem = {
            id,
            prod_quantity
          };
          state.cart_details.push(newItem);
        }
      } else {
        // Directly add or update the item in the cart
        const existingItemIndex = state.cart_details.findIndex(
          item => item.id === action.payload.id
        );

        if (existingItemIndex >= 0) {
          state.cart_details[existingItemIndex].prod_quantity +=
            action.payload.prod_quantity;
        } else {
          state.cart_details.push(action.payload);
        }
      }
    },
    removeFromCartSuccess(state, action) {
      // Remove item from the cart
      state.cart_details = state.cart_details.filter(
        item => item.id !== action.payload
      );
    },
    reduceQuantitySuccess(state, action) {
      // Reduce the quantity of an item in the cart
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );
      if (
        existingItemIndex >= 0 &&
        state.cart_details[existingItemIndex].prod_quantity > 0
      ) {
        state.cart_details[existingItemIndex].prod_quantity -= 1;
      } else {
        console.warn(
          `Cannot reduce quantity for item with id ${action.payload.id}. Item not found or quantity is already 0.`
        );
      }
    },
    plusQuantitySuccess(state, action) {
      // Increase the quantity of an item in the cart
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state.cart_details[existingItemIndex].prod_quantity += 1;
        state.total += 1;
      }
    },
    updateQuantitySuccess(state, action) {
      // Update the quantity of an item in the cart
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        state.cart_details[existingItemIndex].prod_quantity =
          action.payload.prod_quantity;
      }
    },
    clearCartSuccess(state) {
      // Clear the cart
      state.cart_details = [];
      state.error = null;
    },
    addToCartFailure(state, action) {
      // Set error state when adding to cart fails
      state.error = action.payload;
    },
    setLoading(state, action) {
      // Set loading state
      state.loading = action.payload;
    },
    setError(state, action) {
      // Set error state
      state.error = action.payload;
    }
  }
});

// Exporting actions for usage in components
export const {
  cartTotal,
  addToCartSuccess,
  removeFromCartSuccess,
  reduceQuantitySuccess,
  plusQuantitySuccess,
  updateQuantitySuccess,
  addToCartFailure,
  setLoading,
  setError
} = cartSlice.actions;

// Async action to fetch cart items
export const fetchCartItems = () => {
  return async dispatch => {
    dispatch(setLoading(true)); // Start loading state
    try {
      const { error, data } = await getCart(); // Fetch cart data from API
      console.log(error);
      if (error) {
        // If there's an error, clear the cart and set error state
        dispatch(clearCartSuccess());
        dispatch(setError(error));
      } else {
        // If successful, update cart state
        dispatch(cartTotal(data));
      }
    } catch (error) {
      // Handle unexpected errors
      dispatch(clearCartSuccess());
      dispatch(setError("An error occurred while fetching cart items."));
    } finally {
      // End loading state
      dispatch(setLoading(false));
    }
  };
};

// Async action to add an item to the cart
export const addToCartAsync = (id, quantity, shipping, color) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    
    try {
      const state = getState().cart;
      const existingItem = state.cart_details?.find(item => item.id === id);

      if (existingItem) {
        // Item exists in the cart, update the quantity
        const newQuantity = existingItem.prod_quantity + quantity;
        await handleQuantity(id, newQuantity);
        dispatch(addToCartSuccess({ id, prod_quantity: newQuantity }));
      } else {
        const { data, error } = await addToCart(id, quantity, shipping, color);
        console.log(data);
        dispatch(addToCartSuccess(data));
      }
    } catch (error) {
      dispatch(addToCartFailure(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// export const addToCartAsync = (id, quantity, shipping, color) => {
//   return async (dispatch, getState) => {
//     dispatch(setLoading(true));
//     const state = getState().cart;
//     const existingItem = state.cart_details.find(item => item.id === id);

//     try {
//       if (existingItem) {
//         const newQuantity = existingItem.prod_quantity + 1;
//         await handleQuantity(id, newQuantity);
//         dispatch(addToCartSuccess({ id, prod_quantity: newQuantity }));
//       } else {
//         const result = await addToCart(id, quantity, shipping, color);
//         dispatch(addToCartSuccess(result));
//       }
//     } catch (error) {
//       dispatch(addToCartFailure(error.message));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
// };

export const removeFromCartAsync = productId => {
  return async dispatch => {
    try {
      await removeFromCart(productId);
      dispatch(removeFromCartSuccess(productId));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };
};

export const minusOneToCartAsync = productId => {
  return async (dispatch, getState) => {
    const state = getState().cart;
    const existingItem = state.cart_details.find(item => item.id === productId);

    if (existingItem && existingItem.prod_quantity > 0) {
      try {
        const newQuantity = existingItem.prod_quantity - 1;
        await handleQuantity(productId, newQuantity);
        dispatch(reduceQuantitySuccess({ id: productId }));
      } catch (error) {
        console.error("Failed to reduce quantity:", error);
      }
    }
  };
};

export const plusOneToCartAsync = productId => {
  return async (dispatch, getState) => {
    const state = getState().cart;
    const existingItem = state.cart_details.find(item => item.id === productId);

    if (existingItem) {
      try {
        const newQuantity = existingItem.prod_quantity + 1;
        await handleQuantity(productId, newQuantity);
        dispatch(plusQuantitySuccess({ id: productId }));
      } catch (error) {
        console.error("Failed to increase quantity:", error);
      }
    }
  };
};

export const inputQuantityAsync = (productId, input) => {
  return async dispatch => {
    const newQuantity = Number(input);

    try {
      await inputQuantity(productId, newQuantity);
      dispatch(
        updateQuantitySuccess({ id: productId, prod_quantity: newQuantity })
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };
};

export const clearCartAsync = () => {
  return async dispatch => {
    try {
      await clearCart();
      dispatch(clearCartSuccess());
    } catch (error) {
      console.log(error);
    }
  };
};

export default cartSlice.reducer;
