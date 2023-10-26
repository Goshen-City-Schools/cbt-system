// src/redux/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "GSHN/",
  password: "",
  errorMessages: "", // Error message for login details
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.fieldName] = action.payload.fieldValue;
    },
    setLoginError: (state, action) => {
      state.errorMessages = action.payload.errorMessage;
    },
    setUserData: (state, action) => {
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.userID = "GSHN/";
      state.password = "";
      state.userData = null;
      localStorage.removeItem("user"); // Clear the token
    },
  },
});

export const { logout, updateField, setLoginError, setUserData } =
  formSlice.actions;
export default formSlice.reducer;
