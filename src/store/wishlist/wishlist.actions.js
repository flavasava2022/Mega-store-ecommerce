import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabase";


export const getWishlistData = createAsyncThunk(
  "GET_WISHLIST_DATA",
  async (userId) => {

    if (userId) {
      try {
     const { data, error } = await supabase
             .from("wishlist")
             .select("*")
             .eq("user_id", userId);
     
           if (error) return error.message;
           return data[0]?.data.map(item => JSON.parse(item)) || [];
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
  async ({wishlist, item,messageApi,user}) => {

    const found = wishlist?.find((element) => element?.id === item?.id);
    let newWishlist;
    if (found) {
      newWishlist = wishlist?.filter((element) => element?.id !== item?.id);
    } else {
      newWishlist = [...wishlist, item];
    }

    if (user?.id) {
      const data = newWishlist;

      try {
        const { error: updateError } = await supabase
        .from("wishlist")
        .update({
          data: data,
        })
        .eq("user_id", user?.id);

      if (!updateError) {
        messageApi.open({
          type: "success",
          content: `${item?.name} ${found?'Removed':'Added'} To Wishlist Successfully`,
        });
        return data;
      } else return updateError;
    } catch (updateError) {
      messageApi.open({
        type: "error",
        content: updateError?.message,
      });
    }
    } else {
          messageApi.open({
      type: 'success',
      content: `${item?.name} ${found?'Removed':'Added'} To Wishlist Successfully`,
    });
      return newWishlist;
    }
  }
);
