import { Divider, Layout } from "antd";
import logo from "../../assets/MainLogo.png";
import { Link } from "react-router-dom";
function Footer() {
  const { Footer } = Layout;

  return (
    <Footer
      style={{
        textAlign: "center",
        color: "white",
        background: "black",
      }}
    >
      <div className="flex  justify-evenly gap-2">
        <div className=" flex flex-col gap-8   p-2 h-[100%] items-center justify-between">
          <Link to={"/"}>
            <h1 className="text-xl font-semibold text-[#6895D2]">MEGA Store</h1>
          </Link>
          <Link to={"/"} className="mt-auto mb-0">
            <img
              src={logo}
              alt="logo"
              className=" w-[60px] flex items-center justify-center"
              style={{ borderRadius: "30% 70% 70% 30% / 30% 34% 66% 70% " }}
            />
          </Link>
        </div>
        <div className=" flex flex-col  gap-4  p-2 h-[100%] items-center justify-between">
          <h1 className="w-full text-center text-xl font-semibold">Support</h1>
          <p className="w-full text-center text-base footer-menu">
            exclusive@gmail.com
          </p>
          <p className="w-full text-center text-base footer-menu">
            +xxxxx-xxxxx-xxxxx
          </p>
        </div>
      </div>
      <Divider style={{ background: "#6895D2" }} />
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
}

export default Footer;
