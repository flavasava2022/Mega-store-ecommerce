import axios from "axios";
import { getCartData } from "../../store/cart/cart.actions";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + "/auth/local",
      {
        identifier: email,
        password: password,
      }
    );
    // Handle success.
    const { jwt, user } = response.data;
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    // Handle error.
    throw error;
  }
};
export const signUp = async (email, password, displayName) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + "/auth/local/register",
      {
        username: displayName,
        email: email,
        password: password,
      }
    );

    const { jwt, user } = response.data;
    localStorage.setItem("jwt", jwt);
    const wishlistCart = await createWishlistCart(user.id);
    const shoppingCart = await createShoppingCart(user.id);
    const updatedData = await updateUserData(
      user.id,
      shoppingCart,
      wishlistCart
    );
    localStorage.setItem("user", JSON.stringify(updatedData));
    return updatedData;
  } catch (error) {
    // Handle error.
    throw error;
  }
};

const createWishlistCart = async (user_id) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/wishlists`,
      {
        data: {
          data: [],
          user_id: user_id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data.data.id;
  } catch (error) {
    // Handle error.
    throw error;
  }
};
const createShoppingCart = async (user_id) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/carts`,
      {
        data: {
          data: [],
          user_id: user_id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data.data.id;
  } catch (error) {
    // Handle error.
    throw error;
  }
};

const updateUserData = async (user_id, shoppingCart, wishlistCart) => {
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/${user_id}`,
      {
        wishlistCart: Number(wishlistCart),
        shoppingCart: Number(shoppingCart),
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error.
    throw error;
  }
};

// export const getCartData =async(user)=>{

//     try {
//       const response = await axios.get(
//         `http://localhost:1337/api/carts?filters[user_id][$eq]=${user.shoppingCart}&populate=*`,

//         {
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );
//       // Handle success.
//       return response.data.data[0].attributes.data;
//     } catch (error) {
//       // Handle error.
//       return error;
//     }

// }