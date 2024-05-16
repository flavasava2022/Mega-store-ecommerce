import { createSlice } from "@reduxjs/toolkit";
import { addDataToCart, getCartData, removeDataFromCart } from "./cart.actions";

const CART_INITIAL_STATE = {
  cartData: [],
  openDrawer: false,
  isLoadingCart: false,
  errorFetchCart: false,
  isLoadingEditProducts: null,
  errorEditData: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setOpenDrawer(state, action) {
      state.openDrawer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.fulfilled, (state, action) => {
        state.cartData = action.payload;
        state.isLoadingCart = false;
        state.errorFetchCart = false;
      })
      .addCase(getCartData.pending, (state, action) => {
        state.isLoadingCart = true;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.isLoadingCart = false;
        state.errorFetchCart = action?.error?.message;
      })
      .addCase(addDataToCart.pending, (state, action) => {
        state.isLoadingEditProducts = true;
      })
      .addCase(addDataToCart.fulfilled, (state, action) => {
                state.isLoadingEditProducts = false;
        state.errorEditData = false;
        state.cartData = action?.payload;

      })
      .addCase(addDataToCart.rejected, (state, action) => {
        state.isLoadingEditProducts = false;
        state.errorEditData = action?.error?.message;
      })
      .addCase(removeDataFromCart.fulfilled, (state, action) => {
        state.cartData = action.payload;
        state.isLoadingEditProducts = false;
        state.errorEditData = false;
      })
      .addCase(removeDataFromCart.pending, (state, action) => {
        state.isLoadingEditProducts = true;
      })
      .addCase(removeDataFromCart.rejected, (state, action) => {
        state.isLoadingEditProducts = false;
        state.errorEditData = action?.error?.message;
      });
  },
});
export const { setOpenDrawer } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
