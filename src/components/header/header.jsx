import { Drawer, Layout, Menu } from "antd";
import logo from "../../assets/MainLogo.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import WishlistBtn from "../navigationPopups/wishlistBtn";
import ShoppingCart from "../navigationPopups/shoppingCart";
import LoginPopup from "../navigationPopups/loginPopup";
import { useMediaQuery } from "react-responsive";

import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const navigate = useNavigate();
  const { Header } = Layout;
  const items = isDesktopOrLaptop
    ? [
        {
          label: "Home",
          key: "home",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
        {
          label: "Products",
          key: "products",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
        {
          label: "About",
          key: "about",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
        {
          label: "Sign up",
          key: "signup",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
      ]
    : [
        {
          label: "Home",
          key: "home",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
        {
          label: "Products",
          key: "products",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
        {
          label: "About",
          key: "about",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
        {
          label: "Sign up",
          key: "signup",
          style: { fontSize: "18px" },
          className: "header-menu",
        },
        {
          type: "divider",
          style: { margin: "15px 0px" },
        },
        {
          label: "Cart",
          key: "checkout",
          className: "header-menu",
          style: { fontSize: "18px" },
        },
        {
          label: "Wishlist",
          key: "Wishlist",
          className: "header-menu",
          style: { fontSize: "18px" },
        },

        {
          type: "divider",
          style: { margin: "15px 0px" },
        },
      ];

  const onClick = (e) => {
    navigate(`/${e.key === "home" ? "" : e.key}`);
    if (!isDesktopOrLaptop) {
      setOpenDrawer(false);
    }
  };

  return (
    <>
      <Header className="flex items-center justify-between text-white bg-[#FFFFFF] px-[5%]  h-[8vh]  sticky-header">
        <div className="flex items-center justify-between gap-2">
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className=" w-[3rem] flex items-center justify-center"
              style={{ borderRadius: "30% 70% 70% 30% / 30% 34% 66% 70% " }}
            />
          </Link>
          <Link to={"/"}>
            <h1 className="text-xl font-semibold text-[#6895D2]">MEGA Store</h1>
          </Link>
        </div>
        {isDesktopOrLaptop ? (
          <>
            <Menu
              selectedKeys={
                location?.pathname === "/"
                  ? ["home"]
                  : [
                      items.find((data) =>
                        data?.key.includes(
                          location?.pathname.substring(
                            1,
                            location?.pathname?.length
                          )
                        )
                      )?.key,
                    ]
              }
              mode="horizontal"
              items={items}
              className="bg-transparent border-none w-[40%] min-w-fit flex items-center justify-center"
              onClick={onClick}
            />
            <div className=" p-2 flex gap-4 text-xl items-center">
              <LoginPopup />
              <WishlistBtn />
              <ShoppingCart />
            </div>
          </>
        ) : (
          <>
            <FaBars
              onClick={showDrawer}
              style={{ color: "#6895D2", fontSize: "24px" }}
            />
            <Drawer
              title="MENU"
              onClose={onClose}
              open={openDrawer}
              width="90%"
            >
              <Menu
                mode="vertical"
                items={items}
                className="bg-transparent border-none w-full"
                style={{ borderInline: "0px" }}
                onClick={onClick}
                selectedKeys={
                  location?.pathname === "/"
                    ? ["home"]
                    : [
                        items?.find((data) =>
                          data?.key?.includes(
                            location?.pathname?.substring(
                              1,
                              location?.pathname?.length
                            )
                          )
                        )?.key,
                      ]
                }
              />

              <div className="w-[95%] mx-auto flex flex-col gap-2">
                <h1 className="w-full  text-xl ">Support</h1>
                <p className="w-full  text-base ">exclusive@gmail.com</p>
                <p className="w-full  text-base ">+xxxxx-xxxxx-xxxxx</p>
              </div>
            </Drawer>
          </>
        )}
      </Header>
    </>
  );
}

export default Header;
