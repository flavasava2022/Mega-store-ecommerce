import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addOrRemoveDataFromWishListHelper,
  getWishlistData,
} from "./wishlist.actions";

const WISHLIST_INITIAL_STATE = {
  wishlistData: [],
  isLoadingWishList: null,
  errorFetchWishlist: false,
  isLoadingEditWishList: null,
  errorEditWishlist: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: WISHLIST_INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistData.fulfilled, (state, action) => {
        state.wishlistData = action.payload;
        state.isLoadingWishList = false;
        state.errorFetchWishlist = false;
      })
      .addCase(getWishlistData.pending, (state, action) => {
        state.isLoadingWishList = true;
      })
      .addCase(getWishlistData.rejected, (state, action) => {
        state.isLoadingCart = false;
        state.errorFetchCart = action.error.message;
      })
      .addCase(addOrRemoveDataFromWishListHelper.fulfilled, (state, action) => {
        state.wishlistData = action.payload;
        state.isLoadingWishList = false;
        state.errorEditWishlist = false;
      })
      .addCase(addOrRemoveDataFromWishListHelper.pending, (state, action) => {
        state.isLoadingWishList = true;
      })
      .addCase(addOrRemoveDataFromWishListHelper.rejected, (state, action) => {
        state.isLoadingCart = false;
        state.errorEditWishlist = action.error.message;
      });
  },
});

export const wishListReducer = wishlistSlice.reducer;
