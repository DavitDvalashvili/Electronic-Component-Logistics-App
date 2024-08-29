import { useState } from "react";
import UpdateQuantityBox from "./UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import DeleteBox from "./DeleteBox";
import { buttonBoxProps } from "../type";
import { useComponentStore } from "../store/componentStore";

const ButtonBox = ({ currentComponent }: buttonBoxProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(
    currentComponent?.available_quantity
  );
  const { updateComponent, deleteComponent, toggleUpdate } =
    useComponentStore();
  const [showForm, setShowForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = () => {
    if (currentComponent) {
      updateComponent({
        ...currentComponent,
        available_quantity: quantity,
        receipt_date: currentComponent.receipt_date.split("T")[0],
      });
      toggleUpdate();
    }
  };

  const handleDelete = () => {
    if (currentComponent) {
      deleteComponent(currentComponent.id);
      navigate("/components");
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 pt-5">
      <button
        className="px-2 py-2 bg-ChinChinCherry text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          setShowDelete(true);
        }}
      >
        წაშლა
      </button>
      {showDelete && (
        <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center">
          <DeleteBox
            setShowDelete={setShowDelete}
            handleDelete={handleDelete}
            name={currentComponent.name}
          />
        </div>
      )}
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
      <button
        className="px-2 py-2 bg-green text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          setShowForm(true);
        }}
      >
        კომპონენტის განახლება
      </button>
      {showForm && (
        <div
          id="updateQuantity"
          className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-top  z-10"
        >
          <Form status="updating" setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
};

export default ButtonBox;
