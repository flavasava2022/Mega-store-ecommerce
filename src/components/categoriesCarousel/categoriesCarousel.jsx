import { useState } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  MdChair,
  MdElectricalServices,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import { GiClothes, GiHeartNecklace, GiSonicShoes } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

function CategoriesCarousel() {
  return (
    <div className="mt-8 overflow-auto hide_overflow scrollbar">
      <div className="full  flex flex-col gap-4 rounded-lg overflow-auto w-[100%] ">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[35px] bg-[#6895D2]  rounded-md"></div>
          <p className=" text-xl font-semibold text-[#6895D2]">Categories</p>
        </div>
        <div className="flex w-[96%] gap-2 items-center justify-between mx-auto">
          <p className="text-xl font-semibold text-[#D04848] my-4">
            Browse By Category
          </p>
        </div>

        <div
          className={`w-full items-center  justify-start flex gap-4 lg:gap-2   h-[30vh]  overflow-x-auto scrollbar`}
        >
          <Link
            to={`/products`}
            preventScrollReset={true}
            className="h-[85%] min-w-[205px] w-[205px]"
          >
            <div className="category-container h-full border-2 border-[#6895D2] flex items-center justify-center flex-col rounded-3xl gap-2">
              <FaHome
                style={{ fontSize: "77px", color: "#6895D2" }}
                className="category-logo"
              />
              <p className="text-xl font-semibold text-[#6895D2] uppercase category-text">
                All
              </p>
            </div>
          </Link>
          <Link
            to={`/products?category=Electronics`}
            className="h-[85%] min-w-[205px] w-[205px]"
          >
            <div className="category-container h-full border-2 border-[#6895D2] flex items-center justify-center flex-col rounded-3xl gap-2">
              <MdElectricalServices
                style={{ fontSize: "77px", color: "#6895D2" }}
                className="category-logo"
              />
              <p className="text-xl font-semibold text-[#6895D2] uppercase category-text">
                electronics
              </p>
            </div>
          </Link>
          <Link
            to={`/products?category=Clothes`}
            className="h-[85%] min-w-[205px] w-[205px]"
          >
            <div className="category-container h-full border-2 border-[#6895D2] flex items-center justify-center flex-col rounded-3xl gap-2">
              <GiClothes
                style={{ fontSize: "77px", color: "#6895D2" }}
                className="category-logo"
              />
              <p className="text-xl font-semibold text-[#6895D2] uppercase category-text">
                clothes
              </p>
            </div>
          </Link>
          <Link
            to={`/products?category=Shoes`}
            className="h-[85%] min-w-[205px] w-[205px]"
          >
            <div className="category-container h-full  border-2 border-[#6895D2] flex items-center justify-center flex-col rounded-3xl">
              <GiSonicShoes
                style={{ fontSize: "77px", color: "#6895D2" }}
                className="category-logo"
              />
              <p className="text-xl font-semibold text-[#6895D2] uppercase category-text">
                shoes
              </p>
            </div>
          </Link>
          <Link
            to={`/products?category=Furniture`}
            className="h-[85%] min-w-[205px] w-[205px]"
          >
            <div className="category-container h-full border-2 border-[#6895D2] flex items-center justify-center flex-col rounded-3xl gap-2">
              <MdChair
                style={{ fontSize: "77px", color: "#6895D2" }}
                className="category-logo"
              />
              <p className="text-xl font-semibold text-[#6895D2] uppercase category-text">
                furniture
              </p>
            </div>
          </Link>
          <Link
            to={`/products?category=Jewelry`}
            className="h-[85%] min-w-[205px] w-[205px]"
          >
            <div className="category-container h-full border-2 border-[#6895D2] flex items-center justify-center flex-col rounded-3xl gap-2">
              <GiHeartNecklace
                style={{ fontSize: "77px", color: "#6895D2" }}
                className="category-logo"
              />
              <p className="text-xl font-semibold text-[#6895D2] uppercase category-text">
                jewelry
              </p>
            </div>
          </Link>
          <Link
            to={`/products?category=Miscellaneous`}
            className="h-[85%] min-w-[205px] w-[205px]"
          >
            <div className="category-container h-full border-2 border-[#6895D2] flex items-center justify-center flex-col rounded-3xl gap-2">
              <MdOutlineMiscellaneousServices
                style={{ fontSize: "77px", color: "#6895D2" }}
                className="category-logo"
              />
              <p className="text-xl font-semibold text-[#6895D2] uppercase category-text">
                Miscellaneous
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoriesCarousel;
