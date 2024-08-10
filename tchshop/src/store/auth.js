import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    storeLogin(state, action) {
      return action.payload;
    },
    updateLogin(state, action) {
      if (state) {
        const { key, value } = action.payload;
        state[key] = value;
      }
    },
  },
});

export const { storeLogin } = userSlice.actions;
export default userSlice.reducer;
