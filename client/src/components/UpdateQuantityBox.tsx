import { useEffect } from "react";
import { useState } from "react";
import { updateQuantityBoxProps } from "../type";

const UpdateQuantityBox = ({
  setShowPopup,
  quantity,
  setQuantity,
  handleClick,
  componentName,
}: updateQuantityBoxProps) => {
  const [value, setValue] = useState<number>(quantity);

  // Handle the submit action
  const handleSubmit = () => {
    setQuantity(value);
    setShowPopup(false);
    handleClick();
  };

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  return (
    <div className="bg-white text-AntarcticDeep p-10 rounded-md flex flex-col items-center gap-4 text-lg">
      <p className="font-semibold">{componentName}</p>
      <div className="flex justify-start items-center gap-4">
        <p className="NorthAtlanticBreeze">ხელმისაწვდომი რაოდენობა:</p>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
          className="w-16 h-8 text-base rounded-md border-[2px] border-solid border-NorthAtlanticBreeze focus:outline-none p-1"
        />
      </div>
      <div className="flex justify-center items-center gap-4 pt-5">
        <button
          onClick={() => setShowPopup(false)}
          className="px-2 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm"
        >
          გათიშვა
        </button>
        <button
          onClick={handleSubmit}
          className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm"
        >
          განახლება
        </button>
      </div>
    </div>
  );
};

export default UpdateQuantityBox;
