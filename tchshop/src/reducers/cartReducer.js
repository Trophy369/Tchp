import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  handleQuantity,
  inputQuantity,
  removeFromCart
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
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        state.cart_details[existingItemIndex].prod_quantity +=
          action.payload.prod_quantity;
      } else {
        state.cart_details.push(action.payload);
      }
      state.total += action.payload.prod_quantity;
    },
    removeFromCartSuccess(state, action) {
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload
      );
      if (existingItemIndex >= 0) {
        const quantityToRemove =
          state.cart_details[existingItemIndex].prod_quantity;
        state.cart_details.splice(existingItemIndex, 1);
        state.total -= quantityToRemove;
      }
    },
    reduceQuantitySuccess(state, action) {
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );
      if (
        existingItemIndex >= 0 &&
        state.cart_details[existingItemIndex].prod_quantity > 0
      ) {
        state.cart_details[existingItemIndex].prod_quantity -= 1;
        state.total -= 1;
      }
    },
    plusQuantitySuccess(state, action) {
      const existingItemIndex = state.cart_details.findIndex(
        item => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        state.cart_details[existingItemIndex].prod_quantity += 1;
        state.total += 1;
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
        // Item exists in the cart, update the quantity
        const newQuantity = existingItem.prod_quantity + quantity;
        await handleQuantity(id, newQuantity);
        dispatch(addToCartSuccess({ id, prod_quantity: newQuantity }));
      } else {
        // Item does not exist in the cart, add it as a new item
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

export default cartSlice.reducer;
