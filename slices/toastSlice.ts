import { createSlice } from '@reduxjs/toolkit';

export interface toastState {
  toasts1: any;
  toasts: any;
}

const initialState: toastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = toastSlice.actions;

export default toastSlice.reducer;
