import { useEffect, useState } from "react";
import { updateQuantityBoxProps } from "../type";

const UpdateQuantityBox = ({
  setShowPopup,
  quantity,
  setQuantity,
  handleClick,
  name,
}: updateQuantityBoxProps) => {
  const [value, setValue] = useState<number>(quantity);
  const [increaseValue, setIncreaseValue] = useState<number>(0);
  const [decreaseValue, setDecreaseValue] = useState<number>(0);

  // Handle the submit action
  const handleSubmit = () => {
    setQuantity(value);
    setShowPopup(false);
    handleClick();
  };

  useEffect(() => {
    setValue(quantity + increaseValue - decreaseValue);
  }, [increaseValue, decreaseValue]);

  useEffect(() => {
    setQuantity(value);
  }, [value, setQuantity]);

  return (
    <div className="bg-white text-AntarcticDeep p-10 rounded-md flex flex-col items-center gap-4 text-lg">
      <p className="font-semibold">{name}</p>
      <div className="flex justify-start items-center gap-4">
        <p className="NorthAtlanticBreeze">ხელმისაწვდომი რაოდენობა:</p>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              setValue(Number(e.target.value));
            }
          }}
          className="w-16 h-8 text-base rounded-md border-[2px] border-solid border-NorthAtlanticBreeze focus:outline-none p-1"
        />
      </div>
      <div className="flex justify-start items-center gap-4">
        <p className="NorthAtlanticBreeze">ზრდის რაოდენობა</p>
        <input
          type="text"
          value={increaseValue}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              setIncreaseValue(Number(e.target.value));
            }
          }}
          className="w-16 h-8 text-base rounded-md border-[2px] border-solid border-NorthAtlanticBreeze focus:outline-none p-1"
        />
      </div>
      <div className="flex justify-start items-center gap-4">
        <p className="NorthAtlanticBreeze">შემცირების რაოდენობა:</p>
        <input
          type="text"
          value={decreaseValue}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              setDecreaseValue(Number(e.target.value));
            }
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
