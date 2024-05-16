import {
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  notification,
} from "antd";
import { selectUser } from "../../store/user/user.selectors";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../store/user/user.reducer";
import { login } from "../../utils/strapi/strapi";
import { CiLogout, CiMail } from "react-icons/ci";
import { LuClipboardList } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { getCartData } from "../../store/cart/cart.actions";
import { getWishlistData } from "../../store/wishlist/wishlist.actions";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
function LoginPopup() {
  const [loading, setLoading] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setLoading(true);
    let email = values.email;
    let password = values.password;
    try {
      const user = await login(email, password);
      dispatch(setCurrentUser(user));
      api["success"]({
        message: "Login Successful",
        description: `Welcome Back, ${user.username}`,
        placement: "top",
      });
      setLoading(false);
    } catch (error) {
      api["error"]({
        message: "Login UnSuccessful",
        description: error.response?.data?.error?.message || error.message,
        placement: "top",
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch(setCurrentUser(null));
    dispatch(getCartData());
    dispatch(getWishlistData());
    api["success"]({
      message: "Log out Successful",
      description: `You Successfully Logged Out`,
      placement: "top",
    });
  };
  const items = [
    {
      type: "divider",
    },
    {
      icon: <FaRegUser style={{ fontSize: "20px" }} />,
      label: "My Account",
      key: "My Account",
      style: {
        padding: "10px",
        display: "flex",
        gap: "5px",
        alignItems: "center",
      },
      className: "Header-menu",
    },
    {
      icon: <LuClipboardList style={{ fontSize: "20px" }} />,
      label: "My Order",
      key: "My Order",
      style: {
        padding: "10px",
        display: "flex",
        gap: "5px",
        alignItems: "center",
      },
      className: "Header-menu",
    },

    {
      type: "divider",
    },
    {
      icon: <CiLogout style={{ fontSize: "20px" }} />,
      label: <p onClick={handleLogout}>Log out</p>,
      key: "Log out",
      style: {
        padding: "10px",
        display: "flex",
        gap: "5px",
        alignItems: "center",
      },
      className: "Header-menu",
    },
  ];
  return (
    <>
      {isDesktopOrLaptop ? (
        <Dropdown
          placement="bottom"
          arrow
          dropdownRender={() => (
            <div
              className={`py-3 px-2  rounded-xl shadow bg-[#FFFFFF] min-h-[150px] ${
                user ? "w-[220px] " : "w-[300px]"
              }`}
            >
              {user ? (
                <div className="flex items-center justify-between gap-1 w-full flex-col">
                  <div className="flex items-center justify-start gap-3 w-full p-1">
                    <div className="img">
                      <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#6895D2] rounded-full p-1">
                        <p className="font-semibold text-white">
                          {user?.username[0].toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <h4 className="text-black capitalize font-semibold">
                        {user?.username}
                      </h4>
                    </div>
                  </div>
                  <Menu
                    items={items}
                    style={{
                      boxShadow: "none",
                      background: "#FFFFFF",
                      width: "100%",
                      gap: "5px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  />
                </div>
              ) : (
                <div className=" flex flex-col   h-full justify-center gap-2">
                  <div>
                    <Form
                      name="basic-login"
                      onFinish={onFinish}
                      autoComplete="off"
                      layout="vertical"
                      className="flex flex-col gap-2  mt-4 w-[90%] mx-auto"
                    >
                      <Form.Item
                        label="Email"
                        name="email"
                        className="m-0"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input
                          prefix={<CiMail className="site-form-item-icon" />}
                          type="email"
                          placeholder="Email"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        className="m-0"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <RiLockPasswordLine className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Item>

                      <div className="flex flex-col gap-4 mt-2 items-center w-full">
                        <Form.Item className="m-0 w-full">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="font-semibold w-[100%] rounded-full p-3 h-auto flex items-center justify-center text-base"
                          >
                            Log in
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>
              )}
            </div>
          )}
          trigger={"click"}
        >
          <FaRegUser
            style={{ fontSize: "23px", color: "black", cursor: "pointer" }}
          />
        </Dropdown>
      ) : (
        <>
          <FaRegUser
            style={{ fontSize: "23px", color: "black", cursor: "pointer" }}
            onClick={showDrawer}
          />
          <Drawer
            title="ACCOUNT"
            onClose={onClose}
            open={open}
            placement="left"
          >
            {user ? (
              <div className="flex items-center justify-between gap-1 w-full flex-col">
                <div className="flex items-center justify-start gap-3 w-full p-1">
                  <div className="img">
                    <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#6895D2] rounded-full p-1">
                      <p className="font-semibold text-white">
                        {user?.username[0].toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h4 className="text-black capitalize font-semibold">
                      {user?.username}
                    </h4>
                  </div>
                </div>
                <Menu
                  items={items}
                  style={{
                    boxShadow: "none",
                    background: "#FFFFFF",
                    width: "100%",
                    gap: "5px",
                    display: "flex",
                    flexDirection: "column",
                    borderInline: "0px",
                    border: "none",
                  }}
                />
              </div>
            ) : (
              <div className=" flex flex-col gap-2">
                <div>
                  <Form
                    name="basic-login"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    className="flex flex-col gap-2  mt-4 w-[90%] mx-auto"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      className="m-0"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<CiMail className="site-form-item-icon" />}
                        type="email"
                        placeholder="Email"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      className="m-0"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <RiLockPasswordLine className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Item>

                    <div className="flex flex-col gap-4 mt-2 items-center w-full">
                      <Form.Item className="m-0 w-full">
                        <Button
                          loading={loading}
                          type="primary"
                          htmlType="submit"
                          className="font-semibold w-[100%] rounded-full p-3 h-auto flex items-center justify-center text-base"
                        >
                          Log in
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </Drawer>
        </>
      )}

      {contextHolder}
    </>
  );
}

export default LoginPopup;
