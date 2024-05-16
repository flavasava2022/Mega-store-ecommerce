import { Link } from "react-router-dom";
import { Drawer, Badge, Empty, Button, Divider, Spin } from "antd";

import AddToCartDrawer from "../header/addToCartDrawer";
import {
  cartTotalCount,
  cartTotalPrice,
  isOpenDrawer,
  loadingAddToCart,
  selectCartItems,
} from "../../store/cart/cart.selectors";
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../../store/cart/cart.reducer";

import { MdOutlineShoppingCart } from "react-icons/md";

function ShoppingCart() {
  const openDrawer = useSelector(isOpenDrawer);
  const cartData = useSelector(selectCartItems);
  const totalPrice = useSelector(cartTotalPrice);
  const totalCount = useSelector(cartTotalCount);
  const dispatch = useDispatch();
  const loadingAddToCartBTN = useSelector(loadingAddToCart);
  return (
    <>
      <Badge
        className="mx-4"
        count={totalCount}
        overflowCount={100}
        onClick={() => {
          dispatch(setOpenDrawer(true));
        }}
      >
        <MdOutlineShoppingCart
          style={{
            fontSize: "23px",
            cursor: "pointer",
            color: totalCount > 0 ? "red" : "black",
          }}
        />
      </Badge>

      <Drawer
        open={openDrawer}
        onClose={() => dispatch(setOpenDrawer(false))}
        title="SHOPPING CART"
      >
        <div className="flex flex-col gap-4 h-full">
          <div className="p-1 h-[31rem] lg:h-[35rem] overflow-y-scroll flex flex-col items-center  gap-4 hide__scroll">
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
                          <p className="flex items-center border-2 border-dashed border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] text-[12px] !leading-none ">
                            $ {item?.attributes?.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-center w-full gap-4">
                          <AddToCartDrawer
                            quantity={item?.quantity}
                            item={item}
                            key={`${item?.id} cart`}
                          />
                          {loadingAddToCartBTN ? <Spin /> : ""}
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
          <div className="flex items-center justify-between p-2">
            <p className="text-xl font-semibold text-center">Subtotal</p>
            <p className="flex items-center border-2 border-dashed border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
              $ {totalPrice}
            </p>
          </div>
          <p className=" text-sm text-slate-500 dark:text-slate-400 font-normal p-2 text-center">
            Taxes and shipping calculated at checkout
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-auto mb-0">
            <Link to={"/checkout"} className="rounded-full w-[95%]   h-auto">
              {" "}
              <Button
                className=" rounded-full w-[100%] p-4  h-auto bg-[#F3B95F] "
                type="secondary"
              >
                View Cart
              </Button>
            </Link>

            <Button
              className=" rounded-full w-[95%] p-4  h-auto"
              type="primary"
            >
              Check out
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default ShoppingCart;
