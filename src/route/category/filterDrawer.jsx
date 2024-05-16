import { Checkbox, Drawer, Input, Switch } from "antd";
import MultiRangeSlider from "../../components/multiRangePriceSlider/multiRangeSlider";

function FilterDrawer({
  onCloseFiterDrawer,
  openFilterDrawer,
  setFilterMaxPrice,
  setFilterMinPrice,
  filterName,
  setFilterName,
  setSearchParams,
  searchParams,
}) {
  const categoryOptions = [
    "Clothes",
    "Electronics",
    "Miscellaneous",
    "Shoes",
    "Furniture",
    "jewelry",
  ];

  const onCategoryChange = (checkedValues) => {
    let categoriesList = "";
    if (checkedValues.length <= 0) {
      setSearchParams((prevParams) => {
        prevParams.delete("category");
        return prevParams;
      });
    } else {
      checkedValues.map((item, i) => {
        if (i === 0) {
          categoriesList = item;
        } else {
          categoriesList = categoriesList + "&" + item;
        }
      });
      setSearchParams((prevParams) => {
        prevParams.set("category", categoriesList);
        return prevParams;
      });
    }
  };

  const onSaleChange = (checked) => {
    if (checked) {
      setSearchParams((prevParams) => {
        prevParams.set("onSale", true);
        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.delete("onSale");
        return prevParams;
      });
    }
  };
  const onTrendingChange = (checked) => {
    if (checked) {
      setSearchParams((prevParams) => {
        prevParams.set("trends", true);
        return prevParams;
      });
    } else {
      setSearchParams((prevParams) => {
        prevParams.delete("trends");
        return prevParams;
      });
    }
  };

  return (
    <Drawer
      title="FILTER"
      onClose={onCloseFiterDrawer}
      open={openFilterDrawer}
      placement="left"
    >
      <div className="flex flex-col  gap-4 w-full  h-full">
        <div className="flex items-start  gap-2 flex-col">
          <p className="py-1 border-b-2 border-black text-xl font-semibold">
            NAME
          </p>
          <Input
            placeholder="Enter Product Name"
            value={filterName}
            className="w-[70%]"
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <div className="flex items-start  gap-2 flex-col w-full">
          <p className="py-1 border-b-2 border-black text-xl font-semibold">
            PRICE
          </p>
          <div className="flex items-center justify-start gap-2 w-full py-5">
            <MultiRangeSlider
              min={0}
              max={1000}
              onChange={({ min, max }) => {
                setFilterMaxPrice(max);
                setFilterMinPrice(min);
              }}
            />
          </div>
        </div>
        <div className="flex items-start  gap-2 flex-col w-full">
          <p className="py-1 border-b-2 border-black text-xl font-semibold">
            CATEGORY
          </p>
          <Checkbox.Group
            defaultValue={
              searchParams.get("category") === null
                ? []
                : [searchParams.get("category")]
            }
            options={categoryOptions}
            onChange={onCategoryChange}
            className="flex flex-col overflow-y-auto max-h-[150px] flex-nowrap	w-full"
          />
        </div>
        <div className="flex items-start  gap-2 flex-col w-full">
          <p className="py-1 border-b-2 border-black text-xl font-semibold">
            OFFERS
          </p>
          <div className="flex items-center justify-between gap-4 w-[70%]">
            <p>Trending</p>
            <Switch
              defaultChecked={searchParams.has("trends")}
              onChange={onTrendingChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4 w-[70%]">
            <p>On Sale</p>
            <Switch
              defaultChecked={searchParams.has("onSale")}
              onChange={onSaleChange}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default FilterDrawer;
