// src/app/redux/slices/menuSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideMenuOpen: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
  },
});

export const { toggleSideMenu } = menuSlice.actions;

export default menuSlice.reducer;
