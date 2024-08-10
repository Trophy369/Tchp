import { createSlice, configureStore } from "@reduxjs/toolkit"

const authSlice =  createSlice({
    name: "auth",
    initialState: {
        token: null,
        isLoggedin: false,
    },
    reducers: {
        login(token) {},
        logout() {},
    }
})

export const {} = authSlice.actions

const store = configureStore({
    reducer: authSlice.reducer
})

store.subscribe(() => console.log(store.getState()))