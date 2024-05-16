import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Button, Collapse, Rate, Spin, message } from "antd";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { WishListData } from "../../store/wishlist/wishlist.selectors";
import {
  loadingAddToCart,
  selectCartItems,
} from "../../store/cart/cart.selectors";

import ColorBox from "../../components/quickViewModal/colorbox";
import SizeBox from "../../components/quickViewModal/sizeBox";
import AddToCartInputNumber from "../../components/addToCartInputNumber/addToCartInputNumber";
import { addDataToCart } from "../../store/cart/cart.actions";

import Carousel from "../../components/carousel/carsousel";
import { addOrRemoveDataFromWishListHelper } from "../../store/wishlist/wishlist.actions";

function Product() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const { slug } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading, data, error } = useFetch(
    `/products?filters[name][$eq]=${slug}&populate=*`,
    forceUpdate
  );
  const [selectedImg, setSelectedImg] = useState({
    url: data[0]?.attributes?.images?.data[0]?.attributes?.url,
    index: 0,
  });

  const [value, setValue] = useState(1);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };
  const handleBoxSizeClick = (size) => {
    setSelectedSize(size);
  };

  const dispatch = useDispatch();

  const wishlistData = useSelector(WishListData);
  const cartData = useSelector(selectCartItems);
  const loadingAddToCartBTN = useSelector(loadingAddToCart);

  const [wishlist, setWishlist] = useState(false);
  useEffect(() => {
    const itemWishList = wishlistData?.find(
      (element) => element?.id === data[0]?.id
    );
    if (itemWishList) {
      setWishlist(true);
    } else {
      setWishlist(false);
    }
  }, [wishlistData, data]);
  useEffect(() => {
    setSelectedImg({
      ...selectedImg,
      url: data[0]?.attributes?.images?.data[0]?.attributes?.url,
    });
    setSelectedSize(data[0]?.attributes?.sizes[0]);
    setSelectedBox(data[0]?.attributes?.colors[0]);
  }, [data]);
  const description = [
    {
      key: "1",
      label: <p className="text-black uppercase ">Description</p>,
      children: (
        <p className=" max-h-[15vh] overflow-auto scrollbar text-gray-500">
          {data[0]?.attributes?.description}
        </p>
      ),
    },
  ];
  const fits = [
    {
      key: "1",
      label: <p className="text-black uppercase ">How it Fits</p>,
      children: (
        <p className=" max-h-[15vh] overflow-auto scrollbar text-gray-500">
          Use this as a guide. Preference is a huge factor — if you're near the
          top of a size range and/or prefer more coverage, you may want to size
          up.
        </p>
      ),
    },
  ];
  const faq = [
    {
      key: "1",
      label: <p className="text-black uppercase ">faq</p>,
      children: (
        <ul className="list-disc p-2 px-4 list-inside">
          <li className="mb-1">
            All full-priced, unworn items, with tags attached and in their
            original packaging are eligible for return or exchange within 30
            days of placing your order.
          </li>
          <li className="mb-1">
            Please note, packs must be returned in full. We do not accept
            partial returns of packs.
          </li>
          <li className="mb-1">
            Want to know our full returns policies? Here you go.
          </li>
          <li className="mb-1">
            Want more info about shipping, materials or care instructions? Here!
          </li>
        </ul>
      ),
    },
  ];
  const triggerRender = () => {
    setForceUpdate((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      {!loading ? (
        error ? (
          <div className="mx-auto h-[25rem] flex items-center justify-center gap-2 text-xl ">
            Failed to Fetch Product Details{" "}
            <span
              className=" underline cursor-pointer text-red-500"
              onClick={triggerRender}
            >
              Try Again
            </span>
          </div>
        ) : (
          data[0] && (
            <div className="">
              <div className="flex flex-col items-center lg:flex-row  lg:items-stretch justify-evenly gap-4 py-4 w-[90%] mx-auto ">
                <div className="w-full lg:w-[45%] flex flex-col min-h-[100%]">
                  <div className="images-container  h-full">
                    <img
                      src={selectedImg?.url}
                      alt=""
                      className=" min-h-[100%]   object-cover w-auto"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    {Array.from({ length: 3 }).map((item, i) => {
                      return (
                        <div
                          className="w-[35%]   cursor-pointer"
                          onClick={() =>
                            setSelectedImg({ ...selectedImg, index: i })
                          }
                          key={i}
                        >
                          <img
                            src={
                              data[0]?.attributes?.images?.data[0]?.attributes
                                ?.url
                            }
                            alt=""
                            className={`w-[100%] h-[100%]   object-scale-down ${
                              i === selectedImg.index ? "opacity-55" : ""
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="px-4 mt-2 w-full lg:w-[45%] lg:mt-0 flex flex-col  gap-5 justify-between items-start">
                  <p className="text-xl lg:text-3xl font-bold ">
                    {data[0]?.attributes?.name}
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <div className="justify-start gap-4 flex items-center">
                      <p className="text-base flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
                        $ {data[0]?.attributes?.price}
                      </p>
                      <Rate
                        disabled
                        defaultValue={data[0]?.attributes?.rating}
                        className=" text-[28px]"
                      />
                      <div className="h-6 w-[2px]  bg-gray-500"></div>
                    </div>
                    <div className="bg-[#6895D2] p-2 rounded-xl">
                      <FaHeart
                        style={{
                          color: wishlist ? "#D04848" : "white",
                          fontSize: "23px",
                        }}
                        onClick={() => {
                          setWishlist(!wishlist);
                          dispatch(
                            addOrRemoveDataFromWishListHelper({
                              wishlist: wishlistData,
                              item: data[0],
                              messageApi: messageApi,
                            })
                          );
                        }}
                        className="icon-com cursor-pointer "
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="">
                      <p className="text-base uppercase flex items-center">
                        Colors{" "}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-4 mx-auto rounded-b-lg  w-full ">
                      {data[0]?.attributes.colors?.map((colorName, i) => {
                        return (
                          <ColorBox
                            color={colorName}
                            isSelected={selectedBox === colorName}
                            onClick={() => handleBoxClick(colorName)}
                            key={i}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <div className="">
                      <p className="text-base uppercase flex gap-2 items-center">
                        Sizes
                      </p>
                    </div>
                    <div className=" flex items-center justify-center gap-4 mx-auto rounded-b-lg   w-full ">
                      {data[0]?.attributes.sizes?.map((sizes, i) => {
                        return (
                          <SizeBox
                            text={sizes}
                            isSelected={selectedSize === sizes}
                            onClick={() => handleBoxSizeClick(sizes)}
                            key={i}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <Collapse
                    items={description}
                    expandIconPosition="end"
                    className=" rounded-xl "
                    style={{
                      background: "rgba(226,232,240,.6)",
                      width: "100%",
                    }}
                    defaultActiveKey={"1"}
                  />
                  <Collapse
                    items={fits}
                    expandIconPosition="end"
                    className=" rounded-xl "
                    style={{
                      background: "rgba(226,232,240,.6)",
                      width: "100%",
                    }}
                  />
                  <Collapse
                    items={faq}
                    expandIconPosition="end"
                    className=" rounded-xl "
                    style={{
                      background: "rgba(226,232,240,.6)",
                      width: "100%",
                    }}
                  />
                  <div className="flex flex-col lg:flex-row items-center justify-evenly gap-2 w-full mb-0 mt-auto">
                    <AddToCartInputNumber
                      value={value}
                      setValue={setValue}
                      className="w-full"
                    />
                    <Button
                      className=" rounded-full  p-5  h-auto w-full bg-[#F3B95F] "
                      loading={loadingAddToCartBTN}
                      type="secondary"
                      onClick={() => {
                        dispatch(
                          addDataToCart({
                            cartData: cartData,
                            item: data[0],
                            value: value,
                            selectedSize: selectedSize,
                            selectedColor: selectedBox,
                            messageApi: messageApi,
                          })
                        );
                      }}
                    >
                      ADD TO CART
                    </Button>
                    <div></div>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-wrap justify-between items-center gap-2">
                <div
                  className="flex flex-col items-start gap-2 p-6 rounded-xl w-[49%]"
                  style={{
                    background: "rgb(254 242 242)",
                  }}
                >
                  <PiVanLight style={{ color: "black", fontSize: "32px" }} />
                  <p className="font-semibold text-slate-900">Free shipping</p>
                  <p className="text-slate-500 mt-0.5 text-sm">
                    On orders over $50.00
                  </p>
                </div>
                <div
                  className="flex flex-col items-start gap-2 p-6 rounded-xl w-[49%]"
                  style={{
                    background: "rgb(240 249 255)",
                  }}
                >
                  <PiVanLight style={{ color: "black", fontSize: "32px" }} />
                  <p className="font-semibold text-slate-900">Free shipping</p>
                  <p className="text-slate-500 mt-0.5 text-sm">
                    On orders over $50.00
                  </p>
                </div>
                <div
                  className="flex flex-col items-start gap-2 p-6 rounded-xl w-[49%]"
                  style={{
                    background: "rgb(240 253 244)",
                  }}
                >
                  <PiVanLight style={{ color: "black", fontSize: "32px" }} />
                  <p className="font-semibold text-slate-900">Free shipping</p>
                  <p className="text-slate-500 mt-0.5 text-sm">
                    On orders over $50.00
                  </p>
                </div>
                <div
                  className="flex flex-col items-start gap-2 p-6 rounded-xl w-[49%]"
                  style={{
                    background: "rgb(255 251 235)",
                  }}
                >
                  <PiVanLight style={{ color: "black", fontSize: "32px" }} />
                  <p className="font-semibold text-slate-900">Free shipping</p>
                  <p className="text-slate-500 mt-0.5 text-sm">
                    On orders over $50.00
                  </p>
                </div>
              </div> */}
              <div className="w-[90%] lg:w-full mx-auto mt-2 lg:mt-0">
                <Carousel
                  offer={"onSale"}
                  Heading={`Today's`}
                  text={"Flash Sale"}
                />
              </div>
            </div>
          )
        )
      ) : (
        <div className="flex items-center justify-between">
          <Spin
            style={{
              fontSize: "12rem",
            }}
            size="large"
          />
        </div>
      )}
      {contextHolder}
    </div>
  );
}

export default Product;
