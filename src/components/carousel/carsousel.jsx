import ItemCarousel from "./itemCarousel";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import "./carousel.styles.css";
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
function Carousel({ offer, Heading, text }) {
  const [forceUpdate, setForceUpdate] = useState(false);
  const { loading, data, error } = useFetch(
    `/products?filters[${offer}][$eq]=true&populate=*`,
    forceUpdate
  );
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [movement, setMovement] = useState(0);

  const end = Number((data.length - (width * 0.9) / 265) * -250);
  const start = Number((data.length - (width * 0.9) / 265) * 250);
  const leftArrow = () => {
    if (movement === 0) {
      setMovement(end);
    } else {
      if (movement >= start) {
        setMovement(0);
      } else {
        setMovement((pervState) => {
          return pervState + 265;
        });
      }
    }
  };
  const rightArrow = () => {
    if (movement === start) {
      setMovement(0);
    } else {
      if (movement <= end) {
        setMovement(0);
      } else {
        setMovement((pervState) => {
          return pervState - 265;
        });
      }
    }
  };
  const triggerRender = () => {
    setForceUpdate((prevState) => !prevState);
  };
  return (
    <div className="mb-8">
      <div className=" relative  h-[30rem] rounded-lg overflow-hidden w-[100%] hide_scroll">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[35px] bg-[#6895D2]  rounded-md"></div>
          <p className=" text-xl font-semibold text-[#6895D2]">{Heading}</p>
        </div>
        <div className="flex w-[96%] gap-2 items-center justify-between mx-auto">
          <p className="text-xl font-semibold text-[#D04848] my-4">{text}</p>
          <div className="     flex items-center justify-center gap-2">
            <LeftCircleOutlined
              className="text-[30px] text-[#6895D2] cursor-pointer"
              onClick={leftArrow}
            />{" "}
            <RightCircleOutlined
              className="text-[30px] text-[#6895D2] cursor-pointer"
              onClick={rightArrow}
            />
          </div>
        </div>

        {loading ? (
          <div className="w-full  absolute  items-center  justify-center flex gap-2   h-full px-2">
            <div className="mx-auto h-[25rem] flex items-center justify-center gap-2 text-xl ">
              <Spin size="large" className="" />
            </div>
          </div>
        ) : (
          <>
            {error ? (
              <div className="mx-auto h-[25rem] flex items-center justify-center gap-2 text-xl ">
                Failed to Fetch Data{" "}
                <span
                  className=" underline text-red-500 cursor-pointer"
                  onClick={triggerRender}
                >
                  Try Again
                </span>
              </div>
            ) : (
              <div
                className={` absolute  items-center  justify-center flex gap-2   carousel h-[25rem] px-2`}
                style={{ left: `${movement}px` }}
              >
                {data.map((item) => {
                  return (
                    <ItemCarousel
                      item={item}
                      key={item?.id}
                      className="w-[25%]"
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <Link to={`/products?${offer}=true`} unstable_viewTransition>
        <Button
          type="primary"
          className="w-[10rem] p-4 h-[5vh]  flex items-center justify-center rounded-full mx-auto mt-2"
        >
          View All Products
        </Button>
      </Link>
    </div>
  );
}

export default Carousel;
