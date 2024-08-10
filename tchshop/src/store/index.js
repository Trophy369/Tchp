import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"
import productsReducer from "./products"

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer
    }
})

export default store