import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.webp";
import banner3 from "../../assets/banner3.webp";
import { useEffect, useState } from "react";
import "./ImageSlider.css";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const goToNext = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === 2) {
        return 0;
      } else {
        return prevSlide + 1;
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const changePic = (num) => {
    setCurrentSlide(num);
  };

  const images = [banner1, banner2, banner3];

  return (
    <div className=" flex items-center h-[10rem] lg:h-[30rem] mt-4 w-full relative ">
      <div className="absolute flex items-center justify-between gap-4 bottom-[20%] left-[50%] translate-x-[-50%] z-50 ">
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
      <div className=" relative flex   w-full h-[10rem] lg:h-[30rem] rounded-xl  justify-center slider-content">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`slide ${index}`}
            className={`slide-image ${
              index === currentSlide ? "active" : ""
            } w-full h-full rounded-xl object-cover`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
