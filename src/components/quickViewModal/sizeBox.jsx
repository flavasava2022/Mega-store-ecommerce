function SizeBox({ text, isSelected, onClick }) {
  return (
    <div
      className={`w-[68px] h-[40px]  rounded-full flex items-center justify-center ${
        isSelected ? "bg-[#6895D2] text-white" : "bg-white"
      } border-2  cursor-pointer`}
      onClick={onClick}
    >
      <p className="text-xl font-semibold w-[60px] h-[40px]  rounded-full flex items-center justify-center  uppercase">
        {text}
      </p>
    </div>
  );
}

export default SizeBox;
