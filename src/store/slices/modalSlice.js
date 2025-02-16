import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  props: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.props = { ...action.payload.props };

      console.log("🟢 Modal opened with props:", state.props); // Проверка в консоли
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.props = {};

      console.log("🔴 Modal closed"); // Проверка в консоли
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
