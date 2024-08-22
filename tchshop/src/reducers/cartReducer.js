import { createSlice } from "@reduxjs/toolkit";
import { getCart, addToCart, handleQuantity, inputQuantity, removeFromCart } from "../services/userApi";

const initialState = {
    "Number of items": 0,
    cart_details: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartTotal(state, action) {
        state["Number of items"] = action.payload["Number of items"];
        state.cart_details = action.payload.cart_details;
    },
    addToCartSuccess(state, action) {
        const existingItemIndex = state.cart_details.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex >= 0) {
            state.cart_details[existingItemIndex].quantity += action.payload.quantity;
        } else {
            state.cart_details.push(action.payload);
        }
        console.log(action.payload.quantity)
        state["Number of items"] += action.payload.quantity;
    },
    removeFromCartSuccess(state, action) {
        const existingItemIndex = state.cart_details.findIndex(item => item.id === action.payload);
        if (existingItemIndex >= 0) {
            const quantityToRemove = state.cart_details[existingItemIndex].quantity;
            state.cart_details.splice(existingItemIndex, 1);
            state["Number of items"] -= quantityToRemove;
        }
    },
    reduceQuantitySuccess(state, action) {
        const existingItemIndex = state.cart_details.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex >= 0 && state.cart_details[existingItemIndex].quantity > 0) {
            state.cart_details[existingItemIndex].quantity -= 1;
            state["Number of items"] -= 1;
        }
    },
    plusQuantitySuccess(state, action) {
        const existingItemIndex = state.cart_details.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex >= 0 && state.cart_details[existingItemIndex].quantity > 0) {
            state.cart_details[existingItemIndex].quantity += 1;
            state["Number of items"] += 1;
        }
    },
    updateQuantitySuccess(state, action) {
        const existingItemIndex = state.cart_details.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex >= 0) {
            state.cart_details[existingItemIndex].quantity = action.payload.quantity;
        }
    },
    addToCartFailure(state, action) {
        state.error = action.payload;
    },
    setLoading(state, action) {
        state.loading = action.payload;
    },
  },
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

export const addToCartAsync = (id, userId, quantity, shipping, color) => {
    console.log(id, userId, quantity, shipping, color)
    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        const state = getState().cart;

        const existingItem = state.cart_details.find(item => item.id === id);

        try {
            if (existingItem) {
                console.log(existingItem)
                const newQuantity = existingItem.quantity + 1;
                await handleQuantity(id, newQuantity);
                dispatch(addToCartSuccess({ id, quantity: newQuantity }));
            } else {
                const result = await addToCart(id, userId, quantity, shipping, color);
                dispatch(addToCartSuccess(result));
            }
        } catch (error) {
            dispatch(addToCartFailure(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const removeFromCartAsync = (productId) => {
    return async (dispatch) => {
        try {
            await removeFromCart(productId); 
            dispatch(removeFromCartSuccess(productId)); 
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };
};

export const minusOneToCartAsync = (productId) => {
    console.log('wroking', productId)
    return async (dispatch, getState) => {
        const state = getState().cart;
        console.log(state)
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

export const plusOneToCartAsync = (productId) => {
    return async (dispatch, getState) => {
        const state = getState().cart;
        console.log(state)
        const existingItem = state.cart_details.find(item => item.id === productId);

        if (existingItem && existingItem.prod_quantity > 0) {
            try {
                const newQuantity = existingItem.prod_quantity + 1;
                await handleQuantity(productId, newQuantity);
                dispatch(plusQuantitySuccess({ id: productId }));
            } catch (error) {
                console.error("Failed to reduce quantity:", error);
            }
        }
    };
};

export const inputQuantityAsync = (productId, input) => {
    return async (dispatch) => {
        const newQuantity = Number(input);

        try {
            await inputQuantity(productId, newQuantity);
            dispatch(updateQuantitySuccess({ id: productId, quantity: newQuantity }));
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };
};

export const fetchCartItems = () => {
    return async (dispatch) => {
        try {
            const cartItem = await getCart();
            dispatch(cartTotal(cartItem));
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    };
};

export default cartSlice.reducer;





// import { createSlice } from "@reduxjs/toolkit";
// import { getCart } from "../services/userApi";

// const initialState = {
//   "Number of items": 0,
//   cart_details: []
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     cartTotal(state, action) {
//       state.numberOfItems = action.payload.numberOfItems;
//       state.cart_details = action.payload.cart_details;
//     },
//     addToCartSuccess(state, action) {
//       state.cart_details.push(action.payload);
//       state["Number of items"] += 1;
//     }
//   }
// });

// export const { cartTotal } = cartSlice.actions;

// export const fetchCart = () => {
//   return async dispatch => {
//     const cartItem = await getCart();
//     dispatch(cartTotal(cartItem));
//   };
// };

// export const addToCartAsync = (id, userId, quantity, shipping, color) => {
//   return async dispatch => {
//     const result = await addToCart(id, userId, quantity, shipping, color);
//     dispatch(addToCartSuccess(result));
//   };
// };

// export default cartSlice.reducer;
