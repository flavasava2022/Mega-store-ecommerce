import { useEffect, useState } from "react";
import "./grid.styles.css";
import MediaQuery, { useMediaQuery } from "react-responsive";
function GridNumber({
  gridColumns,
  isSelected,
  onGridChange,
  minWidth,
  maxWidth,
  setGridValue,
}) {
  const isVisble = useMediaQuery({ minWidth: minWidth, maxWidth: maxWidth });
  const [columns, setColumns] = useState(Array.from("x".repeat(gridColumns)));
  useEffect(() => {
    if (isVisble) {
      switch (gridColumns) {
        case "5":
          setGridValue("5");

          break;
        case "4":
          setGridValue("4");

          break;
        case "3":
          setGridValue("3");

          break;
        case "2":
          setGridValue("2");

          break;
        case "1":
          setGridValue("1");
          break;
        default:
          break;
      }
    }
  }, [isVisble, gridColumns, setGridValue]);
  return (
    <>
      {gridColumns === "1" ? (
        <div
          style={{ width: `${gridColumns * 26}px` }}
          className={`transition-colors	 grid-container flex h-[30px] px-1 ${
            isSelected ? "border-[#6895D2]" : "border-gray-400"
          }  border-2 bg-white items-center justify-evenly gap-1 rounded-md cursor-pointer`}
          onClick={onGridChange}
        >
          {columns?.map((item, index) => {
            return (
              <div
                key={index}
                className={`transition-colors		 flex w-[12px]  h-[20px] bg-[#6895D2]  ${
                  isSelected ? "bg-[#6895D2]" : "bg-gray-400"
                } `}
              ></div>
            );
          })}
        </div>
      ) : (
        <MediaQuery minWidth={minWidth}>
          <div
            style={{ width: `${gridColumns * 22}px` }}
            className={`transition-colors	 grid-container flex h-[30px] px-1 ${
              isSelected ? "border-[#6895D2]" : "border-gray-400 "
            }  border-2 bg-white items-center justify-evenly gap-1 rounded-md cursor-pointer `}
            onClick={onGridChange}
          >
            {columns?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`transition-colors		 flex w-[7px]  h-[20px] bg-[#6895D2]  ${
                    isSelected ? "bg-[#6895D2]" : "bg-gray-400"
                  } `}
                ></div>
              );
            })}
          </div>
        </MediaQuery>
      )}
    </>
  );
}

export default GridNumber;
