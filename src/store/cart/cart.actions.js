import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCartData = createAsyncThunk("GET_CART_DATA", async (user) => {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/carts/${user?.shoppingCart}?populate=*`,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // Handle success.

      if (response.status === 200) {
        return response?.data?.data?.attributes?.data;
      } else return response;
    } catch (error) {
      // Handle error.
      throw error?.message;
    }
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
  }) => {
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
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
    if (jwt && user?.shoppingCart) {
      const data = newCartData;

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/carts/${user?.shoppingCart}`,
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
          type: "success",
          content: `${item?.attributes?.name} Added To Cart Successfully`,
        });

        if (response.status === 200) {
          return response?.data?.data?.attributes?.data;
        } else return response;
      } catch (error) {
        messageApi.open({
          type: "error",
          content: error?.message,
        });
        // return error;
        throw error?.message;
      }
    } else {
      messageApi.open({
        type: "success",
        content: `${item?.attributes?.name} Added From Cart Successfully`,
      });
      return newCartData;
    }
  }
);

export const removeDataFromCart = createAsyncThunk(
  "REMOVE_DATA_FROM_CART",
  async ({ cartData, item, value, messageApi }) => {
    const jwt = localStorage.getItem("jwt");

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
    const user = JSON.parse(localStorage.getItem("user"));
    if (jwt && user?.shoppingCart) {
      const data = newCartData;

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/carts/${user?.shoppingCart}`,
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
          type: "success",
          content: `${item?.attributes?.name} Removed From Cart Successfully`,
        });

        if (response.status === 200) {
          return response?.data?.data?.attributes?.data;
        } else return response;
      } catch (error) {
        messageApi.open({
          type: "error",
          content: error?.message,
        });
        throw error?.message;
      }
    } else {
      messageApi.open({
        type: "success",
        content: `${item?.attributes?.name} Removed From Cart Successfully`,
      });
      return newCartData;
    }
  }
);
