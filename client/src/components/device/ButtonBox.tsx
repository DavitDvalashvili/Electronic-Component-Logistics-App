import { useState } from "react";
import UpdateQuantityBox from "./../UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "./../device/Form";
import DeleteBox from "./../DeleteBox";
import { buttonBox } from "../../type";
import { useDeviceStore } from "../../store/deviceStore";

const ButtonBox = ({ currentDevice }: buttonBox) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(
    currentDevice?.available_quantity
  );
  const { updateDevice, deleteDevice, toggleUpdate } = useDeviceStore();
  const [showForm, setShowForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = () => {
    if (currentDevice) {
      updateDevice({
        ...currentDevice,
        available_quantity: quantity,
      });
      toggleUpdate();
    }
  };

  const handleDelete = () => {
    if (currentDevice) {
      deleteDevice(currentDevice.id);
      navigate("/devices");
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
            name={currentDevice.name}
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
            quantity={currentDevice.available_quantity}
            setQuantity={setQuantity}
            handleClick={handleClick}
            name={currentDevice.name}
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
