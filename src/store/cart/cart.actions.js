import { createAsyncThunk } from "@reduxjs/toolkit";


import { supabase } from "../../utils/supabase";



export const getCartData = createAsyncThunk("GET_CART_DATA", async (userId) => {
  if (userId) {
    try {
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", userId);

      if (error) return error.message;

      return data[0]?.data.map(item => JSON.parse(item)) || [];
    } catch (err) {}
  } else {
    return [];
  }
});
export const addDataToCart = createAsyncThunk(
  "ADD_DATA_TO_CART",
  async ({
    cartData,
    item,
    value,
    selectedSize,
    selectedColor,
    messageApi,
    user
  }) => {


    const found = cartData?.find((element) => element.id === item.id);
    let newCartData;
    if (found) {
      newCartData = cartData?.map((cartItem) => {
        if (cartItem.id === item?.id) {
          return {
            ...cartItem,
            quantity: cartItem?.quantity + value,

            selectedSize: selectedSize,
            selectedColor: selectedColor,
          };
        } else {
          return {
            ...cartItem,
            selectedSize: selectedSize,
            selectedColor: selectedColor,
          };
        }
      });
    } else {
      newCartData = [
        ...cartData,
        {
          ...item,
          quantity: value,
          selectedSize: selectedSize,
          selectedColor: selectedColor,
        },
      ];
    }

    if (user?.id) {

      const data = newCartData;

      try {
        const { error: updateError } = await supabase
          .from("cart")
          .update({
            data: data,
          })
          .eq("user_id", user?.id);

        if (!updateError) {
          messageApi.open({
            type: "success",
            content: `${item?.name} Added To Cart Successfully`,
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
        type: "success",
        content: `${item?.name} Added From Cart Successfully`,
      });
      return newCartData;
    }
  }
);

export const removeDataFromCart = createAsyncThunk(
  "REMOVE_DATA_FROM_CART",
  async ({ cartData, item, value, messageApi,user }) => {


    let newCartData;
    if (value !== 1) {
      newCartData = cartData.map((cartItem) => {
        if (cartItem.id === item?.id) {
          return { ...cartItem, quantity: value - 1 };
        } else {
          return cartItem;
        }
      });
    } else {
      newCartData = cartData.filter((cartItem) => cartItem.id !== item?.id);
    }

    if (user?.id) {
      const data = newCartData;

      try {
        const { error: updateError } = await supabase
          .from("cart")
          .update({
            data: data,
          })
          .eq("user_id", user?.id);

        if (!updateError) {
          messageApi.open({
            type: "success",
            content: `${item?.name} Removed From cart Successfully`,
          });
          return data;
        } else return updateError;
      } catch (updateError) {
        messageApi.open({
          type: "error",
          content: updateError?.message,
        });
        throw updateError?.message;
      }
    } else {
      messageApi.open({
        type: "success",
        content: `${item?.name} Removed From Cart Successfully`,
      });
      return newCartData;
    }
  }
);
