import { useEffect, useState } from "react";
import { useAppDispatch } from "../App/hook";
import UpdateQuantityBox from "../components/updateQuantityBox";
import { getComponent, updateComponent } from "../feature/componentSlice";
import { IComponent } from "../type";
import { useParams } from "react-router-dom";

interface ButtonBoxProps {
  currentComponent: IComponent;
}

const ButtonBox = ({ currentComponent }: ButtonBoxProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const { id } = useParams();

  const handleClick = () => {
    if (currentComponent) {
      dispatch(
        updateComponent({
          ...currentComponent,
          available_quantity: quantity,
          receipt_date: currentComponent.receipt_date.split("T")[0],
        })
      );
      setUpdate(!update);
    }
  };

  useEffect(() => {
    if (update == true) {
      dispatch(getComponent(`${id}`));
    }
  }, [update, dispatch]);

  return (
    <div className="flex justify-evenly items-center">
      <button className="px-2 py-2 bg-ChinChinCherry text-white rounded-md cursor-pointer text-sm">
        წაშლა
      </button>
      <button
        className="px-2 py-2 bg-SheetMetal text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          setShowPopup(true);
        }}
      >
        რაოდენობის განახლება
      </button>
      {showPopup && (
        <div
          id="updateQuantity"
          className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center"
        >
          <UpdateQuantityBox
            setShowPopup={setShowPopup}
            quantity={currentComponent.available_quantity}
            setQuantity={setQuantity}
            handleClick={handleClick}
            componentName={currentComponent.name}
          />
        </div>
      )}
      <button className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm">
        ფოტოს დამატება
      </button>
    </div>
  );
};

export default ButtonBox;
