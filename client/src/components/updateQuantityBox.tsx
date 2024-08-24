import React from "react";
import { useState } from "react";

interface UpdateQuantityBoxProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleClick: () => void;
  componentName: string;
}

const UpdateQuantityBox: React.FC<UpdateQuantityBoxProps> = ({
  setShowPopup,
  quantity,
  setQuantity,
  handleClick,
  componentName,
}) => {
  const [value, setValue] = useState<number>(quantity);

  const handleSubmit = () => {
    setShowPopup(false);
    handleClick();
  };

  return (
    <div className="bg-white text-AntarcticDeep p-10 rounded-md flex flex-col items-center gap-4 text-lg ">
      <p className="font-semibold">{componentName}</p>
      <div className="flex justify-start items-center gap-4">
        <p>ხელმისაწვდომი რაოდენობა:</p>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
            setValue(Number(e.target.value));
          }}
          className="w-16 h-8 text-base rounded-md border-[2px] border-solid border-NorthAtlanticBreeze focus:outline-none p-1"
        />
      </div>
      <div className="flex justify-center items-center gap-4 pt-5">
        <button
          onClick={() => {
            setShowPopup(false);
          }}
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
