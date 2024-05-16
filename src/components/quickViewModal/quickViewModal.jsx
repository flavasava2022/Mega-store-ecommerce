import { Button, Collapse, Modal, Rate, message } from "antd";

import { useEffect, useState } from "react";
import AddToCartInputNumber from "../addToCartInputNumber/addToCartInputNumber";

import ColorBox from "./colorbox";
import SizeBox from "./sizeBox";
import { useDispatch, useSelector } from "react-redux";

import { WishListData } from "../../store/wishlist/wishlist.selectors";
import { FaHeart } from "react-icons/fa";
import { addDataToCart } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selectors";
import { setOpenDrawer } from "../../store/cart/cart.reducer";
import { addOrRemoveDataFromWishListHelper } from "../../store/wishlist/wishlist.actions";

function QuickViewModal({ item, setIsModalOpen, isModalOpen, id }) {
  const [value, setValue] = useState(1);
  const [selectedBox, setSelectedBox] = useState(item?.attributes?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(item?.attributes?.sizes[0]);
  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };
  const handleBoxSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValue(1);
  };
  const dispatch = useDispatch();
  const wishlistData = useSelector(WishListData);
  const cartData = useSelector(selectCartItems);

  const [messageApi, contextHolder] = message.useMessage();
  const [wishlist, setWishlist] = useState(false);
  useEffect(() => {
    const itemWishList = wishlistData?.find((element) => element?.id === id);
    if (itemWishList) {
      setWishlist(true);
    }
  }, [item, wishlistData, id]);
  const modalStyles = {
    header: {
      borderLeft: `5px solid black`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      height: "fit",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid #333",
    },
    content: {
      boxShadow: "0 0 30px #999",
      background: "#ffffff",
      borderRadius: "18px",
    },
  };
  const items = [
    {
      key: "1",
      label: <p className="text-black">Description</p>,
      children: (
        <p className=" max-h-[15vh] overflow-auto scrollbar text-gray-500">
          {item.attributes?.description}
        </p>
      ),
    },
  ];
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      styles={modalStyles}
      footer={null}
      width="50vw"
    >
      <div className="flex justify-between py-4  gap-8 max-h-[100%] min-h-[100%]">
        <div className="w-[40%] min-h-[100%] max-h-[100%]  ">
          <img
            src={item?.attributes?.images?.data[0]?.attributes?.url}
            alt=""
            className="w-[100%] h-[100%] object-fill"
          />
        </div>
        <div className="px-4 py-2 w-[60%] flex flex-col h-[100%] gap-5 justify-between">
          <p className="text-xl font-semibold ">{item.attributes?.name}</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
                $ {item.attributes?.price}
              </p>
              <Rate
                disabled
                defaultValue={item.attributes?.rating}
                className=" text-[28px]"
              />
            </div>

            <FaHeart
              style={{ color: wishlist ? "#D04848" : "grey", fontSize: "23px" }}
              onClick={() => {
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[18px] flex gap-2 items-center capitalize font-bold">
                Color{" "}
              </p>
              {item?.attributes?.colors?.map((colorName, i) => {
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[18px] flex gap-2 items-center capitalize font-bold">
                Size
              </p>
              {item?.attributes?.sizes?.map((sizes, i) => {
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
            items={items}
            expandIconPosition="end"
            className=" rounded-xl "
            style={{ background: "rgba(226,232,240,.6)" }}
          />

          <div className="flex items-center justify-evenly gap-1 w-full ">
            <AddToCartInputNumber
              value={value}
              setValue={setValue}
              className=""
            />
            <Button
              className=" rounded-full  p-5  h-auto w-[65%] bg-[#F3B95F] "
              type="secondary"
              onClick={() => {
                dispatch(
                  addDataToCart({
                    cartData: cartData,
                    item: item,
                    value: value,
                    selectedSize: selectedSize,
                    selectedColor: selectedBox,
                    messageApi: messageApi,
                  })
                );
                handleCancel();
                dispatch(setOpenDrawer(true));
              }}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
        {contextHolder}
      </div>
    </Modal>
  );
}

export default QuickViewModal;
