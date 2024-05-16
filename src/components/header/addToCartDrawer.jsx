import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { InputNumber, message } from "antd";
import { useEffect, useState } from "react";

import "../../App.css";
import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selectors";
import {
  addDataToCart,
  removeDataFromCart,
} from "../../store/cart/cart.actions";
function AddToCartDrawer({ quantity, item }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(quantity);
  const cartData = useSelector(selectCartItems);
  const [messageApi, contextHolder] = message.useMessage();
  const increment = () => {
    if (value !== 10) {
      setValue(value + 1);
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
    }
  };
  const decrement = () => {
    setValue(value - 1);
    dispatch(
      removeDataFromCart({
        cartData: cartData,
        item: item,
        value: value,
        messageApi: messageApi,
      })
    );
  };
  useEffect(() => {
    setValue(quantity);
  }, [quantity]);
  return (
    <div className="flex rounded-full p-3 bg-[#6895D2] h-auto  justify-between w-[100%]">
      <button
        onClick={decrement}
        className="flex items-center justify-center  p-2 rounded-full	text-white bg-[white]"
      >
        {value === 1 ? (
          <DeleteOutlined
            style={{ fontSize: "14px", color: "black", fontWeight: "bolder" }}
          />
        ) : (
          <MinusOutlined
            style={{ fontSize: "14px", color: "black", fontWeight: "bolder" }}
          />
        )}
      </button>
      <InputNumber
        readOnly
        onChange={setValue}
        max={10}
        value={value}
        style={{
          border: "none",
          width: "40px",
          fontSize: "14px",
          fontWeight: "bolder",
        }}
        className="Input-Number  bg-transparent"
      />
      <button
        onClick={increment}
        className="flex items-center justify-center  p-2 rounded-full	text-white bg-[white]"
      >
        <PlusOutlined
          style={{ fontSize: "18px", color: "black", fontWeight: "bolder" }}
        />
      </button>
      {contextHolder}
    </div>
  );
}

export default AddToCartDrawer;
