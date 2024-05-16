import { Button, Rate, message } from "antd";
import "./itemContainer.styles.css";
import {
  EyeOutlined,
  ShoppingCartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import QuickViewModal from "../quickViewModal/quickViewModal";

import {
  loadingAddToCart,
  selectCartItems,
} from "../../store/cart/cart.selectors";

import { useSelector, useDispatch } from "react-redux";

import { WishListData } from "../../store/wishlist/wishlist.selectors";

import { addOrRemoveDataFromWishListHelper } from "../../store/wishlist/wishlist.actions";
import { addDataToCart } from "../../store/cart/cart.actions";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function ItemContainer({ item, id }) {
  const dispatch = useDispatch();

  const cartData = useSelector(selectCartItems);
  const wishlistData = useSelector(WishListData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [wishlist, setWishlist] = useState(false);
  const loadingAddToCartBTN = useSelector(loadingAddToCart);
  useEffect(() => {
    const itemWishList = wishlistData.find((element) => element?.id === id);
    if (itemWishList) {
      setWishlist(true);
    } else {
      setWishlist(false);
    }
  }, [item, wishlistData, id]);
  const showModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const addToCartHandelr = (event) => {
    event.preventDefault();
    dispatch(
      addDataToCart({
        cartData: cartData,
        item: item,
        value: 1,
        messageApi: messageApi,
      })
    );
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <>
      <Link
        to={`../product/${item?.attributes.name}`}
        className="min-w-[200px]   h-[420px]"
      >
        <div className="main-container relative bg-white p-6 text-center overflow-hidden shadow-inner	border-1 min-w-[200px]   h-[420px] rounded-3xl flex flex-col items-center gap-4 border-2 border-grey cursor-pointer">
          <div className="w-[95%] min-h-[70%] max-h-[70%]  rounded-3xl">
            <img
              src={item?.attributes?.images?.data[0]?.attributes?.url}
              alt=""
              className="w-[100%] h-[100%] rounded-3xl  object-scale-down"
            />
          </div>
          <div className=" absolute  w-full h-full  top-0 left-0 overlay-cart   opacity-0 flex flex-col items-center justify-end gap-2">
            <div className="wishList absolute top-[20px] left-[-80px] flex flex-col gap-4 z-50 text-white text-xl border-2 border-[#6895D2] rounded-lg p-2 ">
              <HeartFilled
                style={{ color: wishlist ? "#D04848" : "white" }}
                onClick={(event) => {
                  event.preventDefault();
                  setWishlist(!wishlist);
                  dispatch(
                    addOrRemoveDataFromWishListHelper({
                      wishlist: wishlistData,
                      item: item,
                      messageApi: messageApi,
                    })
                  );
                }}
                className="icon-com"
              />
            </div>
            <div className="flex-col flex w-full items-center gap-2 bottom-[-200px] absolute btns-container">
              {isDesktopOrLaptop ? (
                <Button
                  onClick={showModal}
                  className="quick-view-btn relative w-[60%] p-4 h-[50px] rounded-full "
                >
                  <p className="quick-view-btn-text  w-full h-full opacity-1 items-center justify-center">
                    Quick View
                  </p>
                  <div className="quick-view-btn-logo  w-full h-full opacity-0 items-center justify-center ">
                    <EyeOutlined style={{ fontSize: "24px" }} />
                  </div>
                </Button>
              ) : (
                ""
              )}
              <Button
                loading={loadingAddToCartBTN}
                type="primary"
                onClick={addToCartHandelr}
                className="addToCart-btn relative w-[60%] p-4 h-[50px] rounded-full mb-6 flex  items-center justify-between"
              >
                <p className="addToCart-btn-text  w-full h-full flex items-center justify-center text-center">
                  add To Cart
                </p>
                <div className="addToCart-btn-logo w-full h-full hidden items-center justify-center">
                  <ShoppingCartOutlined style={{ fontSize: "24px" }} />
                </div>
              </Button>
            </div>
          </div>
          <p className="text-center overflow-hidden">{item.attributes?.name}</p>
          <div className="flex items-center justify-between w-full mt-auto">
            <Rate disabled defaultValue={item.attributes?.rating} />
            <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
              $ {item.attributes?.price}
            </p>
          </div>

          {contextHolder}
        </div>
      </Link>
      <QuickViewModal
        item={item}
        id={id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default ItemContainer;
