// portalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const portalSlice = createSlice({
  name: "portal",
  initialState: {
    isOpen: true,
    eventType: null, // Store the event type or modal type
  },
  reducers: {
    openPortal: (state, action) => {
      state.isOpen = true;
      state.eventType = action.payload;
    },
    closePortal: (state) => {
      state.isOpen = false;
      state.eventType = null;
    },
  },
});

export const { openPortal, closePortal } = portalSlice.actions;
export const selectPortal = (state) => state.portal;
export default portalSlice.reducer;
