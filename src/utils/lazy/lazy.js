import { lazy } from "react";

export const MainLayout = lazy(() =>
  import("../../route/mainLayout/mainLayout")
);
export const Signup = lazy(() => import("../../route/signup/signup"));
export const WishList = lazy(() => import("../../route/wishList/wishlist"));
export const Category = lazy(() => import("../../route/category/category"));
export const Product = lazy(() => import("../../route/product/product"));
export const Checkout = lazy(() => import("../../route/checkout/checkout"));
export const Home = lazy(() => import("../../route/home/home"));
export const About = lazy(() => import("../../route/about/about"));
