function ColorBox({ color, isSelected, onClick }) {
  return (
    <div
      className={` bg-white w-[4rem] h-[2rem] lg:w-[5rem] lg:h-[3rem]  rounded-full cursor-pointer flex items-center justify-center ${
        isSelected ? "border-2 border-[#6895D2]" : "border-2 border-transparent"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-[3rem] h-[1rem] lg:w-[4rem] lg:h-[2rem] rounded-full`}
        style={{ background: color }}
      ></div>
    </div>
  );
}

export default ColorBox;
