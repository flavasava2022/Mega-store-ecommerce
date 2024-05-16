import { Button, Rate, message } from "antd";
import "../itemContainer/itemContainer.styles.css";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import QuickViewModal from "../quickViewModal/quickViewModal";
import {
  loadingAddToCart,
  selectCartItems,
} from "../../store/cart/cart.selectors";

import { useSelector, useDispatch } from "react-redux";
import { WishListData } from "../../store/wishlist/wishlist.selectors";

import { addDataToCart } from "../../store/cart/cart.actions";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function ItemCarousel({ item }) {
  const dispatch = useDispatch();
  const wishlistData = useSelector(WishListData);
  const cartData = useSelector(selectCartItems);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [wishlist, setWishlist] = useState(false);
  const loadingAddToCartBTN = useSelector(loadingAddToCart);
  useEffect(() => {
    const itemWishList = wishlistData?.find(
      (element) => element?.id === item?.id
    );
    if (itemWishList) {
      setWishlist(true);
    }
  }, [item, wishlistData]);
  const showModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <>
      <Link
        to={`../product/${item?.attributes.name}`}
        className="w-[20%] min-w-[242px]   h-[90%]"
      >
        <div className=" main-container relative  bg-white p-6 text-center overflow-hidden shadow-inner	border-2 border-grey-100 w-[20%] min-w-[242px]   h-[90%] rounded-3xl flex flex-col items-center gap-4 cursor-pointer">
          <div className="w-[90%] min-h-[60%] max-h-[60%] rounded-3xl ">
            <img
              src={item?.attributes?.images?.data[0]?.attributes?.url}
              alt=""
              className="w-[100%] h-[100%] object-scale-down rounded-3xl"
            />
          </div>
          <div className=" absolute  w-full h-full  top-0 left-0 overlay-cart   opacity-0 flex flex-col items-center justify-end gap-2">
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
              type="primary"
              loading={loadingAddToCartBTN}
              onClick={(event) => {
                event.preventDefault();
                dispatch(
                  addDataToCart({
                    cartData: cartData,
                    item: item,
                    value: 1,
                    selectedSize: item.attributes.sizes[0],
                    selectedColor: item.attributes.colors[0],
                    messageApi: messageApi,
                  })
                );
              }}
              className="addToCart-btn relative w-[60%] p-4 h-[50px] rounded-full mb-6 flex  items-center justify-between"
            >
              <p className="addToCart-btn-text  w-full h-full  flex items-center justify-center text-center">
                Add To Cart
              </p>
              <div className="addToCart-btn-logo w-full h-full hidden items-center justify-center">
                <ShoppingCartOutlined style={{ fontSize: "24px" }} />
              </div>
            </Button>
          </div>
          <p className="text-center overflow-hidden max-h-[45px]">
            {item?.attributes?.name}
          </p>
          <div className="flex items-center justify-between w-full mt-auto">
            <Rate disabled defaultValue={item?.attributes?.rating} />
            <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
              $ {Math.floor(item?.attributes?.price)}
            </p>
          </div>
        </div>
      </Link>
      <QuickViewModal
        item={item}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {contextHolder}
    </>
  );
}

export default ItemCarousel;
