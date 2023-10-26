// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    menu: menuReducer,
    // portal: portalReducer,
  },
});

export default store;
