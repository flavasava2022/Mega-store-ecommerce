import { useSelector } from "react-redux";
import {
  cartTotalPrice,
  loadingAddToCart,
  selectCartItems,
} from "../../store/cart/cart.selectors";
import AddToCartDrawer from "../../components/header/addToCartDrawer";
import { Button, Divider, Empty, Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function Checkout() {
  const cartData = useSelector(selectCartItems);
  const cartTotal = useSelector(cartTotalPrice);
  const loadingAddToCartBTN = useSelector(loadingAddToCart);
  const [tableData, setTableData] = useState([]);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  useEffect(() => {
    setTableData([]);
    cartData.map((item, i) => {
      setTableData((perv) => {
        return [
          ...perv,
          {
            key: i,
            Product: (
              <div className="flex items-center justify-between gap-4">
                <img
                  src={item?.attributes?.images?.data[0]?.attributes?.url}
                  alt=""
                  className="w-[90px] h-[90px]   object-scale-down rounded-2xl"
                />
                <p className="text-start w-full">{item.attributes?.name}</p>
              </div>
            ),
            Price: (
              <p className="flex items-center justify-center w-full">
                $ {item.attributes?.price}
              </p>
            ),
            Quantity: (
              <AddToCartDrawer
                quantity={item?.quantity}
                item={item}
                key={`${item?.id} cart`}
              />
            ),
            Subtotal: (
              <p className="flex items-center justify-center w-full">
                $ {item?.quantity * item.attributes?.price}
              </p>
            ),
          },
        ];
      });
    });
  }, [cartData]);

  const columns = [
    {
      title: <p className="text-center">Product</p>,
      dataIndex: "Product",
      key: "Product",
      className: "w-[40%]",
    },
    {
      title: <p className="text-center">Price</p>,
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: <p className="text-center">Quantity</p>,
      dataIndex: "Quantity",
      key: "Quantity",
      className: "max-w-[200px]",
      render: (text, record, index) => (
        <div className="flex items-center justify-center w-full gap-4 ">
          <div className="w-[180px]">{text}</div>
          {loadingAddToCartBTN ? <Spin /> : ""}
        </div>
      ),
    },
    {
      title: <p className="text-center">Subtotal</p>,
      dataIndex: "Subtotal",
      key: "Subtotal",
    },
  ];
  return (
    <div
      className={`flex items-start justify-between gap-4  mt-4   ${
        isDesktopOrLaptop ? "" : "flex-col"
      }`}
    >
      <div className={`${isDesktopOrLaptop ? "w-[75%]" : "w-full"}`}>
        {isDesktopOrLaptop ? (
          <Table
            dataSource={tableData}
            columns={columns}
            bordered={true}
            align="center"
            pagination={{ pageSize: 4, position: ["bottomCenter"] }}
            size="small"
          />
        ) : (
          <div className="max-h-[22rem] lg:max-h-[20rem] overflow-auto">
            {cartData?.length ? (
              cartData?.map((item) => {
                return (
                  <div className="w-full" key={item?.id}>
                    <div className="p-2 flex  items-center  justify-between gap-3  w-full">
                      <div className="w-[100px] h-[120px] ">
                        <img
                          src={item?.attributes?.images.data[0].attributes.url}
                          alt={item?.attributes?.name}
                          className="w-[100%] h-[100%] object-cover"
                        />
                      </div>
                      <div className="w-[80%] flex flex-col h-[120px] gap-2 items-stretch justify-between">
                        <div className="flex items-start justify-between gap-2 ">
                          <Link to={`../product/${item?.attributes.name}`}>
                            <p className="text-base  font-normal leading-5	">
                              {item?.attributes?.name}
                            </p>
                          </Link>
                        </div>
                        <div className="flex items-center justify-between w-full gap-2">
                          <p className="flex items-center border-2 border-dashed border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] text-[12px] !leading-none ">
                            $ {item?.attributes?.price}
                          </p>
                          <div className="flex items-center justify-center w-full">
                            <div className="w-[180px] mx-auto">
                              <AddToCartDrawer
                                quantity={item?.quantity}
                                item={item}
                                key={`${item?.id} cart`}
                              />
                            </div>
                            {loadingAddToCartBTN ? <Spin /> : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider />
                  </div>
                );
              })
            ) : (
              <div className="flex h-full items-center justify-center">
                <Empty />
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`border-2 border-[#6895D2] ${
          isDesktopOrLaptop ? "w-[20%] min-w-[250px]" : "w-full"
        }  p-4 flex flex-col gap-4 rounded-xl`}
      >
        <p className=" text-xl font-semibold text-[#6895D2]">Cart Total</p>
        <div className="w-[90%] mx-auto border-b-2 border-[#6895D2] flex items-center justify-between py-2">
          <p className="text-[#D04848]">SubTotal:</p>
          <p className="text-[#D04848]">$ {cartTotal}</p>
        </div>
        <div className="w-[90%] mx-auto border-b-2 border-[#6895D2] flex items-center justify-between py-2">
          <p className="text-[#D04848]">Shipping:</p>
          <p className="text-[#D04848]">Free</p>
        </div>
        <div className="w-[90%] mx-auto border-b-2 border-[#6895D2] flex items-center justify-between py-2">
          <p className="text-[#D04848]">Total:</p>
          <p className="text-[#D04848]">$ {cartTotal}</p>
        </div>
        <Link className="w-[95%] mx-auto ">
          <Button
            type="primary"
            className="w-full rounded-2xl py-6 flex items-center justify-center"
          >
            Proceed to checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
