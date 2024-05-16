import { Affix, Layout } from "antd";

import Header from "../../components/header/header";
import "../../App.css";

import { Outlet, useLocation } from "react-router-dom";

import Footer from "../../components/footer/footer";
import ShoppingCart from "../../components/navigationPopups/shoppingCart";
import WishlistBtn from "../../components/navigationPopups/wishlistBtn";
import LoginPopup from "../../components/navigationPopups/loginPopup";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export default function MainLayout() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <Layout className=" relative scrollbar  min-h-[100vh] bg-white mb-[4rem] lg:mb-0">
      <ScrollToTop />
      {!isDesktopOrLaptop ? (
        <div className="shadow-inner fixed bottom-0 w-full p-5 flex gap-4 text-xl items-center justify-evenly bg-white z-30 h-[4rem]">
          <LoginPopup />
          <WishlistBtn />
          <ShoppingCart />
        </div>
      ) : (
        ""
      )}

      <Header />
      <div className=" w-[90%] mx-auto p-2 mt-[8vh]">
        <Outlet />
      </div>
      {isDesktopOrLaptop ? (
        <div className="mt-auto mb-0">
          <Footer />
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}
