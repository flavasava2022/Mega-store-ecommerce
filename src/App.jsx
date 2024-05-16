import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { lazy, Suspense, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./store/user/user.reducer";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { getCartData } from "./store/cart/cart.actions";
import { selectUser } from "./store/user/user.selectors";

import { notification, Spin } from "antd";
import { getWishlistData } from "./store/wishlist/wishlist.actions";

import {
  About,
  Category,
  Checkout,
  Home,
  MainLayout,
  Product,
  Signup,
  WishList,
} from "./utils/lazy/lazy";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const jwt = localStorage.getItem("jwt");
  const [api, contextHolder] = notification.useNotification();

  const fetchUser = async (jwt) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch(setCurrentUser(response.data));
      api["success"]({
        message: "Login Successful",
        description: `Welcome Back, ${response.data?.username}`,
        placement: "top",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      api["error"]({
        message: "Login error",
        description: `${error}`,
        placement: "top",
      });
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    }
  };
  useEffect(() => {
    if (jwt) {
      fetchUser(jwt);
    }
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(getCartData(user));
      dispatch(getWishlistData(user));
    }
  }, [user, api, dispatch]);
  const Routing = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,

      children: [
        { index: true, element: <Home /> },
        { path: "/signup", element: <Signup /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/products/", element: <Category /> },
        { path: "/product/:slug", element: <Product /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/about", element: <About /> },
      ],
    },
  ]);
  return (
    <Suspense
      fallback={
        <div className=" absolute z-50 	 translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] 		">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 80,
                }}
                spin
              />
            }
          />
        </div>
      }
    >
      <RouterProvider router={Routing} />
      {contextHolder}
    </Suspense>
  );
}

export default App;
