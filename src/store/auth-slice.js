import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: false,
  name: null,
  imageUrl: true,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const payload = action.payload;

      state.email = payload.email;
      state.name = payload.name;
      state.imageUrl = payload.imageUrl;
      state.isLogin = true;
    },

    logout(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
