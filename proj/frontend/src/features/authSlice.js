import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user"),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", user);
      state.user = user;
      state.token = accessToken;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
