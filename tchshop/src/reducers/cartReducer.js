import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  handleQuantity,
  inputQuantity,
  removeFromCart,
  clearCart
} from "../services/userApi";

const initialState = {
  total: 0,
  cart_details: [],
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartTotal(state, action) {
      state.total = action.payload.total;
      state.cart_details = action.payload.cart_details;
    },
    addToCartSuccess(state, action) {
      console.log(action.payload);
      
      if (action.payload.Message) {
        // If the payload is a message, you need to extract the product details
        const messageParts = action.payload.Message.split(',');
        const productDetails = messageParts[0].split(' '); // Adjust parsing as needed
    
        // Assuming the product ID and quantity are part of the message
        const id = productDetails[2]; // Adjust index based on your message format
        const prod_quantity = parseInt(messageParts[1].split(':')[1].trim()); // Extract quantity
    
        const existingItemIndex = state.cart_details.findIndex(item => item.id === id);
        
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const existingQuantity = state.cart_details[existingItemIndex].prod_quantity;
          state.cart_details[existingItemIndex].prod_quantity += prod_quantity;
          // Update total based on the new quantity
          state.total += (prod_quantity); // Add the quantity of the existing item
        } else {
          // Create a new item object based on the parsed details
          const newItem = {
            id,
            prod_quantity,
            // Add other necessary fields if available
          };
          state.cart_details.push(newItem);
          // Update total for the new item
          state.total += prod_quantity; // Add the quantity of the new item
        }
      } else {
        // Handle the case where the payload is in the expected format
        const existingItemIndex = state.cart_details.findIndex(item => item.id === action.payload.id);
        
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const existingQuantity = state.cart_details[existingItemIndex].prod_quantity;
          state.cart_details[existingItemIndex].prod_quantity += action.payload.prod_quantity;
          state.total += action.payload.prod_quantity; // Add the quantity of the existing item
        } else {
          state.cart_details.push(action.payload);
          // Update total for the new item
          state.total += action.payload.prod_quantity; // Add the quantity of the new item
        }
      }
    },    
    removeFromCartSuccess(state, action) {
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload
      );
    
      if (existingItemIndex >= 0) {
        const quantityToRemove = state.cart_details[existingItemIndex].prod_quantity;
        
        state.cart_details.splice(existingItemIndex, 1);
        
        state.total -= quantityToRemove;
      } else {
        console.warn(`Item with id ${action.payload} not found in cart.`);
      }
    },
    reduceQuantitySuccess(state, action) {
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );
    
      if (existingItemIndex >= 0 && state.cart_details[existingItemIndex].prod_quantity > 0) {
        state.cart_details[existingItemIndex].prod_quantity -= 1;
      } else {
        console.warn(`Cannot reduce quantity for item with id ${action.payload.id}. Item not found or quantity is already 0.`);
      }
    },
    plusQuantitySuccess(state, action) {
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
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        state.cart_details[existingItemIndex].prod_quantity =
          action.payload.prod_quantity;
      }
    },
    clearCartSuccess(state) {
      state.cart_details = [];
      state.total = 0;
    },
    addToCartFailure(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
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
  setLoading
} = cartSlice.actions;

export const addToCartAsync = (id, quantity, shipping, color) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));

    try {
      const state = getState().cart;
      const existingItem = state.cart_details?.find(item => item.id === id);

      if (existingItem) {
        const newQuantity = existingItem.prod_quantity + quantity;
        console.log('new q: ', newQuantity, id)
        await handleQuantity(id, newQuantity);
        dispatch(addToCartSuccess({ id, prod_quantity: newQuantity }));
      } else {
        const result = await addToCart(id, quantity, shipping, color);
        dispatch(addToCartSuccess(result));
      }
    } catch (error) {
      dispatch(addToCartFailure(error.message));
    } finally {
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

export const fetchCartItems = () => {
  return async dispatch => {
    try {
      const cartItem = await getCart();
      dispatch(cartTotal(cartItem));
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
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
