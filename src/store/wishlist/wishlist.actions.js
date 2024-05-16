import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWishlistData = createAsyncThunk(
  "GET_WISHLIST_DATA",
  async (user) => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/wishlists/${user?.wishlistCart}?populate=*`,

          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
              if (response.status === 200) {
        return response?.data?.data?.attributes?.data;
      } else return response;
      } catch (error) {
        // Handle error.
        throw error.message;
      }
    } else {
      return [];
    }
  }
);

export const addOrRemoveDataFromWishListHelper = createAsyncThunk(
  "ADD_OR_REMOVE_FROM_WISHLIST",
  async ({wishlist, item,messageApi}) => {
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
    const found = wishlist?.find((element) => element?.id === item?.id);
    let newWishlist;
    if (found) {
      newWishlist = wishlist?.filter((element) => element?.id !== item?.id);
    } else {
      newWishlist = [...wishlist, item];
    }

    if (jwt && user?.wishlistCart) {
      const data = newWishlist;

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/wishlists/${user?.wishlistCart}`,
          {
            data: {
              data: data,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
    messageApi.open({
      type: 'success',
      content: `${item?.attributes?.name} ${found?'Removed From':'Added To'}  Wishlist Successfully`,
    });
              if (response.status === 200) {
        return response?.data?.data?.attributes?.data;
      } else return response;
      } catch (error) {
            messageApi.open({
      type: 'error',
      content: error.message,
    });
        throw error.message;
      }
    } else {
          messageApi.open({
      type: 'success',
      content: `${item?.attributes?.name} ${found?'Removed':'Added'} To Wishlist Successfully`,
    });
      return newWishlist;
    }
  }
);
