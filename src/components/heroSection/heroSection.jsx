import { useMediaQuery } from "react-responsive";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import { useState } from "react";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const changePic = (num) => {
    setCurrentSlide(num);
  };

  return (
    <div className="flex items-center h-[10rem] lg:h-[30rem] mt-4 w-full">
      <div className=" relative   flex items-center h-[15rem] lg:h-[30rem] rounded-xl w-[100%] justify-center">
        <div className="absolute flex items-center justify-between gap-4 bottom-[20%] mx-auto z-50 ">
          <span
            className={`bullet w-[25px] h-1 ${
              currentSlide === 0 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(0)}
          ></span>
          <span
            className={`bullet w-[25px] h-1 ${
              currentSlide === 1 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(1)}
          ></span>
          <span
            className={`bullet w-[25px] h-1 ${
              currentSlide === 2 ? "bg-red-500" : "bg-white"
            } cursor-pointer `}
            onClick={() => changePic(2)}
          ></span>
        </div>
        <div className=" relative flex overflow-hidden  w-full h-[10rem] lg:h-[30rem] rounded-xl  justify-center">
          <div
            className={`absolute   w-[100%] h-[10rem] lg:h-[30rem] picHolder rounded-xl`}
            style={{
              transform: `translateY(-${
                currentSlide * (isDesktopOrLaptop ? 30 : 10)
              }rem`,
            }}
          >
            <img
              src={banner1}
              alt=""
              className="picHolder  w-full h-full rounded-xl  object-cover"
            />
            <img
              src={banner2}
              alt=""
              className="picHolder w-full h-full rounded-xl object-cover"
            />
            <img
              src={banner3}
              alt=""
              className="picHolder w-full h-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
