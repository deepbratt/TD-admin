import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
  user?: object | any;
  isLoggedIn: boolean;
  token?: string;
}

const initialState: IInitialState = {
  user: {},
  isLoggedIn: localStorage.getItem("tdwadminjwt") ? true : false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.data.user;
      state.token = action.payload.token;
      localStorage.setItem("tezdealz_ad_jwt", action.payload.token);
    },
    logout: (state) => {
      state.user = {};
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("tezdealz_ad_jwt");
    },
    updateUserData: (state, action) => {
      state.user = action.payload.data.user;
    },
  },
});

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
