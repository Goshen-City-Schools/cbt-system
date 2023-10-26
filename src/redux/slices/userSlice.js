// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // Initialize with the user's authentication status
  // Other user-related data
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define actions to update the user's authentication status
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
