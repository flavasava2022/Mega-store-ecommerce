import { Button, Form, Input, notification } from "antd";
import signUpPic from "../../assets/6310507.jpg";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { setCurrentUser } from "../../store/user/user.reducer";
import { useDispatch } from "react-redux";
import { signUp } from "../../utils/strapi/strapi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Signup() {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    if (values.password === values.ConfirmPass) {
      setLoading(true);
      let email = values.email;
      let password = values.password;
      let displayName = values.username;
      try {
        const user = await signUp(email, password, displayName);
        dispatch(setCurrentUser(user));
        navigate("/");
        setLoading(false);
      } catch (error) {
        api["error"]({
          message: "Signup UnSuccessful",
          description: error.response?.data?.error?.message || error.message,
          placement: "top",
        });
        setLoading(false);
      }
    } else {
      api["error"]({
        message: "Auth problem",
        description: "password doesn't match",
        placement: "top",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="flex items-center justify-evenly gap-6 h-[80vh] ">
      <div className="w-[60%] h-[60vh] hidden lg:block">
        <img
          src={signUpPic}
          alt=""
          className="w-full object-cover max-h-full"
        />
      </div>
      <div className=" flex flex-col   h-full justify-center items-center lg:items-start gap-2 w-full lg:w-[38%]">
        <h1 className="text-[32px] font-semibold text-[#6895D2] text-center lg:text-start lg:w-full">
          Create an account
        </h1>

        <div>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="flex flex-col gap-2 w-[250px] lg:w-[400px] mt-4"
          >
            <Form.Item
              label="Name"
              name="username"
              className="m-0"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
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
                prefix={<MailOutlined className="site-form-item-icon" />}
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
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="ConfirmPass"
              className="m-0"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <div className="flex flex-col gap-4 mt-4 items-center w-full">
              <Form.Item className="m-0 w-full">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="w-full rounded-full p-4 h-auto flex items-center justify-center text-base"
                >
                  Create Account
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}

export default Signup;
