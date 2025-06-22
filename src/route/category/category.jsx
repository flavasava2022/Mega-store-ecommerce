import { useEffect, useState } from "react";

import { Button, Empty, Spin } from "antd";
import GridNumber from "./grid";

import { useSearchParams } from "react-router-dom";
import ItemContainer from "../../components/itemContainer/itemContainer";
import FilterDrawer from "./filterDrawer";
import { useFetch } from "../../hooks/useFetch";
import { FaFilter } from "react-icons/fa";

function Category() {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, data, error } = useFetch(forceUpdate);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [gridValue, setGridValue] = useState("5");
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState(9999);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const showFilterDrawer = () => {
    setOpenFilterDrawer(true);
  };
  const onCloseFiterDrawer = () => {
    setOpenFilterDrawer(false);
  };

  useEffect(() => {
    const categoriesList = searchParams.get("category")
      ? searchParams.get("category").split("&")
      : [];

    const filteredItems = data.filter((item) => {
      const isInCategory =
        categoriesList.length === 0
          ? true
          : categoriesList.find((Category) => Category === item?.category);
      const isPriceInRange =
        item?.price <= parseFloat(filterMaxPrice) &&
        item?.price >= parseFloat(filterMinPrice);
      const isOnSale =
        (searchParams.get("onSale") === "true" ? 1 : 0) === item?.on_sale;
      const isTrending =
        (searchParams.get("trends") === "true" ? 1 : 0) === item?.trends;
      const hasSelectedFilterNames =
        filterName.length === 0 ||
        item?.name.toLowerCase().includes(filterName.toLocaleLowerCase());

      return (
        isPriceInRange &&
        hasSelectedFilterNames &&
        (searchParams.get("onSale") === "true" ? isOnSale : true) &&
        (searchParams.get("trends") === "true" ? isTrending : true) &&
        isInCategory
      );
    });
    setPaginatedItems(
      filteredItems?.slice(
        0,

        itemsPerPage >= filteredItems?.length
          ? filteredItems?.length
          : itemsPerPage
      )
    );
  }, [
    data,
    itemsPerPage,
    filterMaxPrice,
    filterMinPrice,
    filterName,
    searchParams,
  ]);
  const onGridChange = (value) => {
    setGridValue(value);
  };

  const ShowMore = () => {
    itemsPerPage >= data?.length
      ? setItemsPerPage(data?.length)
      : setItemsPerPage((pervState) => {
          return pervState * 2;
        });
  };
  const triggerRender = () => {
    setForceUpdate((prevState) => !prevState);
  };
  return (
    <div className="flex items-start justify-start gap-2 flex-col w-full mx-auto  my-4 min-h-[80vh] mt-8">
      {error ? (
        <div className="mx-auto h-[25rem] flex items-center justify-center gap-2 text-xl ">
          Failed to Fetch Data{" "}
          <span
            className=" underline text-red-500 cursor-pointer"
            onClick={triggerRender}
          >
            Try Again
          </span>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-2 justify-between p-2 ">
          <div className="w-full flex items-center justify-between">
            <div
              onClick={showFilterDrawer}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <FaFilter className="text-xl text-gray-400" />
              <p className="text-xl  text-gray-400">FILTER</p>{" "}
            </div>
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
          {loading ? (
            <div className="w-full min-h-[80vh] flex items-center justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="min-h-[80vh] flex items-center justify-center">
              {paginatedItems?.length === 0 ? (
                <Empty />
              ) : (
                <div
                  className=" ease-in duration-500 grid items-start  justify-center   gap-6 itemsContainer w-full my-4 min-h-[80vh]"
                  style={{ gridTemplateColumns: `repeat(${gridValue}, 1fr)` }}
                >
                  {paginatedItems?.map((item, index) => (
                    <ItemContainer item={item} key={item.id} id={item.id} />
                  ))}
                </div>
              )}
            </div>
          )}

          {itemsPerPage >= data?.length ? (
            ""
          ) : (
            <Button
              type="primary flex items-center justify-center mx-auto rounded-full w-[80%] lg:w-[20%] p-4 h-auto font-bold mt-6 text-[1rem]"
              onClick={ShowMore}
            >
              Show More
            </Button>
          )}
        </div>
      )}

      <FilterDrawer
        onCloseFiterDrawer={onCloseFiterDrawer}
        openFilterDrawer={openFilterDrawer}
        setFilterMaxPrice={setFilterMaxPrice}
        setFilterMinPrice={setFilterMinPrice}
        filterMaxPrice={filterMaxPrice}
        filterMinPrice={filterMinPrice}
        filterName={filterName}
        setFilterName={setFilterName}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </div>
  );
}

export default Category;
