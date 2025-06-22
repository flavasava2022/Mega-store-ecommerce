import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { lazy, Suspense, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.reducer";

import { LoadingOutlined } from "@ant-design/icons";

import { notification, Spin } from "antd";

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
import ErrorPage from "./route/ErrorPage/ErrorPage";
import { supabase } from "./utils/supabase";
import { getCartData } from "./store/cart/cart.actions";
import { getWishlistData } from "./store/wishlist/wishlist.actions";

function App() {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {});
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setCurrentUser(session?.user));
        dispatch(getCartData(session?.user?.id));
        dispatch(getWishlistData(session?.user?.id));
        api["success"]({
          message: "Login Successful",
          description: `Welcome Back, ${
            session?.user.user_metadata?.displayName || session?.user.email
          }`,
          placement: "top",
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [api, dispatch]);

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
        { path: "*", element: <ErrorPage /> },
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
