import { useEffect, useState } from "react";

import { Pagination, Select, Spin } from "antd";
import GridNumber from "./grid";

import { useSearchParams } from "react-router-dom";
import ItemContainer from "../../components/itemContainer/itemContainer";
import FilterDrawer from "./filterDrawer";
import { useFetch } from "../../hooks/useFetch";
import { FaFilter } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
function Category() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = Array.from(searchParams.entries())
    .map(([key, value]) => {
      switch (key) {
        case "sort":
          return `${key}=${value}`;
          break;
        case "onSale":
          return `filters[${key}][$eq]=${value}`;
          break;
        case "trends":
          return `filters[${key}][$eq]=${value}`;
          break;
        case "category":
          return value
            ?.split("&")
            .map((entry) => {
              return `filters[${key}][$eq]=${entry}`;
            })
            .join("&");

          break;
        default:
          break;
      }
    })
    .join("&");
  const { loading, data, error } = useFetch(
    `/products?${queryString}&populate=*`
  );
  const [currentPage, setCurrentPage] = useState(1);
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
    const filteredItems = data.filter((item) => {
      const isPriceInRange =
        item?.attributes?.price <= parseFloat(filterMaxPrice) &&
        item?.attributes?.price >= parseFloat(filterMinPrice);

      const hasSelectedFilterNames =
        filterName.length === 0 ||
        item.attributes?.name
          .toLowerCase()
          .includes(filterName.toLocaleLowerCase());

      return isPriceInRange && hasSelectedFilterNames;
    });
    setPaginatedItems(
      filteredItems?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage *
          (itemsPerPage >= filteredItems?.length
            ? filteredItems?.length
            : itemsPerPage)
      )
    );
  }, [
    data,
    currentPage,
    itemsPerPage,
    filterMaxPrice,
    filterMinPrice,
    filterName,
  ]);
  const onGridChange = (value) => {
    setGridValue(value);
  };
  const handleSortChange = (value) => {
    setSearchParams((prevParams) => {
      prevParams.set("sort", value);

      return prevParams;
    });
  };

  return (
    <div className="flex items-start justify-start gap-2 flex-col w-full mx-auto  my-4 min-h-[80vh] mt-8">
      {error ? (
        <p>Failed to Fetch Data</p>
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
            <Select
              defaultValue={
                searchParams.get("sort") === null
                  ? ["name:asc"]
                  : [searchParams.get("sort")]
              }
              style={{
                width: 160,
              }}
              onChange={handleSortChange}
              options={[
                {
                  label: " A-Z",
                  value: "name:asc",
                },
                {
                  label: "Z-A",
                  value: "name:desc",
                },
                {
                  label: "Price low to high",
                  value: "price:asc",
                },
                {
                  label: "Price high to low",
                  value: "price:desc",
                },
              ]}
            />
          </div>
          {loading ? (
            <div className="w-full min-h-[80vh] flex items-center justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <div
              className=" ease-in duration-500 grid items-center  justify-center   gap-6 itemsContainer w-full my-4"
              style={{ gridTemplateColumns: `repeat(${gridValue}, 1fr)` }}
            >
              {/* Render paginated items */}
              {paginatedItems?.map((item, index) => (
                <ItemContainer item={item} key={item.id} id={item.id} />
              ))}
            </div>
          )}

          <Pagination
            defaultCurrent={1}
            total={data?.length}
            onChange={(page) => setCurrentPage(page)}
            hideOnSinglePage={true}
            className="mt-4"
            size={isDesktopOrLaptop ? "large" : "small"}
            showSizeChanger={false}
          />
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
