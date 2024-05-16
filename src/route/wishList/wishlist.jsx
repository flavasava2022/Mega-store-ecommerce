import { useEffect, useState } from "react";
import ItemContainer from "../../components/itemContainer/itemContainer";
import { Empty, Pagination, Spin } from "antd";
import GridNumber from "../category/grid";

import { useSelector } from "react-redux";
import { WishListData } from "../../store/wishlist/wishlist.selectors";
function ItemsContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [loading, setLoading] = useState(false);

  const [gridValue, setGridValue] = useState("5");
  const [paginatedItems, setPaginatedItems] = useState([]);
  const wishlistData = useSelector(WishListData);
  useEffect(() => {
    setPaginatedItems(
      wishlistData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [wishlistData, currentPage, itemsPerPage]);
  const onGridChange = (value) => {
    setGridValue(value);
  };

  return (
    <div className=" gap-2 flex-col min-w-[80%]  my-4 min-h-[70vh] h-full">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="w-full flex flex-col items-center gap-2 justify-between p-2 h-full">
          <div className="w-full flex items-center justify-center">
            <div className="flex items-center justify-between gap-2">
              <GridNumber
                gridColumns={"1"}
                isSelected={gridValue === "1"}
                onGridChange={() => onGridChange("1")}
                minWidth={1}
                maxWidth={600}
                setGridValue={setGridValue}
              />

              <GridNumber
                gridColumns={"2"}
                isSelected={gridValue === "2"}
                onGridChange={() => onGridChange("2")}
                minWidth={601}
                maxWidth={890}
                setGridValue={setGridValue}
              />

              <GridNumber
                gridColumns={"3"}
                isSelected={gridValue === "3"}
                onGridChange={() => onGridChange("3")}
                minWidth={891}
                maxWidth={1200}
                setGridValue={setGridValue}
              />

              <GridNumber
                gridColumns={"4"}
                isSelected={gridValue === "4"}
                onGridChange={() => onGridChange("4")}
                minWidth={1201}
                maxWidth={1535}
                setGridValue={setGridValue}
              />

              <GridNumber
                gridColumns={"5"}
                isSelected={gridValue === "5"}
                onGridChange={() => onGridChange("5")}
                minWidth={1536}
                maxWidth={5000}
                setGridValue={setGridValue}
              />
            </div>
          </div>
          {paginatedItems.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full min-h-[20vh] mt-auto mb-0">
              <Empty />
            </div>
          ) : (
            <div
              className="grid items-center  justify-center   gap-6 itemsContainer w-full my-4"
              style={{ gridTemplateColumns: `repeat(${gridValue}, 1fr)` }}
            >
              {/* Render paginated items */}
              {paginatedItems.map((item, index) => (
                <ItemContainer item={item} key={item.id} id={item.id} />
              ))}
            </div>
          )}

          <Pagination
            defaultCurrent={1}
            total={wishlistData.length}
            onChange={(page) => setCurrentPage(page)}
            hideOnSinglePage={true}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}

export default ItemsContainer;
