// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
// };

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      //
      state.user = action.payload;
    },
    logout: (state, action) => {
      // return {
      //   ...state,
      //   user: null,
      // };
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


