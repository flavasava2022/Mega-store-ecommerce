import { Badge, Button, Drawer, Dropdown, Empty } from "antd";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { WishListData } from "../../store/wishlist/wishlist.selectors";
import { FaRegHeart } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
function WishlistBtn() {
  const wishlistData = useSelector(WishListData);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      {isDesktopOrLaptop ? (
        <Dropdown
          placement="bottom"
          arrow
          dropdownRender={() => (
            <div
              className="p-6  rounded-xl shadow bg-[#FFFFFF] 
                w-[350px]  min-h-[150px] "
            >
              <h3 className="text-xl font-semibold text-center">
                WhishList Cart
              </h3>
              <div className="max-h-[350px] overflow-auto flex flex-col items-center gap-2 mt-6 scrollbar">
                {wishlistData.length ? (
                  wishlistData?.map((item) => {
                    return (
                      <div
                        className="flex gap-2 py-4 w-full justify-between items-center"
                        key={item?.id}
                      >
                        <div className=" w-[80px] h-[60px]">
                          {" "}
                          <img
                            src={
                              item?.attributes?.images.data[0].attributes.url
                            }
                            alt={item?.attributes?.name}
                            className="w-[100%] h-[100%] object-cover"
                          />
                        </div>

                        <div className="flex items-center justify-between gap-2 p-2 w-full">
                          <Link to={`../product/${item?.attributes.name}`}>
                            <p className="text-[13px]  font-normal leading-5	">
                              {item?.attributes?.name}
                            </p>
                          </Link>
                          <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
                            $ {item?.attributes?.price}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </div>
              {wishlistData?.length ? (
                <Link to={"/wishList"}>
                  <Button
                    type="primary"
                    className="text-base font-semibold flex items-center justify-center p-6 mx-auto rounded-full mt-2"
                  >
                    {" "}
                    Visit WishList Page
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </div>
          )}
          trigger="click"
        >
          <Badge className="mx-4" count={wishlistData?.length}>
            <FaRegHeart
              style={{
                fontSize: "23px",
                cursor: "pointer",
                color: wishlistData?.length > 0 ? "red" : "black",
              }}
            />
          </Badge>
        </Dropdown>
      ) : (
        <>
          <Badge
            className="mx-4"
            count={wishlistData?.length}
            onClick={showDrawer}
          >
            <FaRegHeart
              style={{
                fontSize: "23px",
                cursor: "pointer",
                color: wishlistData?.length > 0 ? "red" : "black",
              }}
            />
          </Badge>
          <Drawer
            title="WISHLIST CART"
            onClose={onClose}
            open={open}
            placement="left"
          >
            <div className="max-h-[85%] overflow-auto flex flex-col items-center gap-2 mt-6 scrollbar">
              {wishlistData.length ? (
                wishlistData?.map((item) => {
                  return (
                    <div
                      className="flex gap-2 py-4 w-full justify-between items-center"
                      key={item?.id}
                    >
                      <div className=" w-[80px] h-[60px]">
                        {" "}
                        <img
                          src={item?.attributes?.images.data[0].attributes.url}
                          alt={item?.attributes?.name}
                          className="w-[100%] h-[100%] object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 p-2 w-full">
                        <Link to={`../product/${item?.attributes.name}`}>
                          <p className="text-[13px]  font-normal leading-5	">
                            {item?.attributes?.name}
                          </p>
                        </Link>
                        <p className="flex items-center border-2 border-[#6895D2] rounded-lg min-w-fit font-medium p-2 text-[#6895D2] !leading-none ">
                          $ {item?.attributes?.price}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Empty />
              )}
            </div>
            {wishlistData?.length ? (
              <Link to={"/wishList"} className="mt-auto mb-3">
                <Button
                  type="primary"
                  className="text-base font-semibold flex items-center justify-center p-6 mx-auto rounded-full mt-2"
                >
                  {" "}
                  Visit WishList Page
                </Button>
              </Link>
            ) : (
              ""
            )}
          </Drawer>
        </>
      )}
    </>
  );
}

export default WishlistBtn;
