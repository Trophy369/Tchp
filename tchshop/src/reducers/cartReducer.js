import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  handleQuantity,
  inputQuantity,
  removeFromCart,
  clearCart
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
        const messageParts = action.payload.Message.split(",");
        const productDetails = messageParts[0].split(" ");
        const id = productDetails[2];
        const prod_quantity = parseInt(messageParts[1].split(":")[1].trim());

        const existingItemIndex = state.cart_details.findIndex(
          item => item.id === id
        );

        if (existingItemIndex >= 0) {
          state.cart_details[existingItemIndex].prod_quantity += prod_quantity;
        } else {
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
      } else {
        console.warn(`Item with id ${action.payload.id} not found in cart.`);
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

export const {
  cartTotal,
  addToCartSuccess,
  removeFromCartSuccess,
  reduceQuantitySuccess,
  plusQuantitySuccess,
  updateQuantitySuccess,
  clearCartSuccess,
  addToCartFailure,
  setLoading,
  setError
} = cartSlice.actions;

export const fetchCartItems = () => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      const response = await getCart();

      if (response.cart_details && response.cart_details.length === 0) {
        dispatch(setError('Your cart is empty. Please add items to proceed.'));
      } else if (response.error) {
        dispatch(setError(response.error));
      } else {
        dispatch(cartTotal(response));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error("Error fetching cart items:", error);
      dispatch(setError("An unexpected error occurred while fetching cart items."));
    }
  };
};

export const addToCartAsync = (id, quantity, shipping, color) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data, error } = await addToCart(id, quantity, shipping, color);
      
      if (error) {
        dispatch(addToCartFailure(error));
      } else {
        dispatch(addToCartSuccess(data));
        dispatch(fetchCartItems())
      }
    } catch (error) {
      dispatch(addToCartFailure("An unexpected error occurred while adding the item to the cart."));
    } finally {
      // End loading state
      dispatch(setLoading(false));
    }
  };
};

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
