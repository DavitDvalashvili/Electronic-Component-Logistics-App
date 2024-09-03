import { useRef, useState } from "react";
import UpdateQuantityBox from "./../UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "./../device/Form";
import Calculator from "./Calculator";
import DeleteBox from "./../DeleteBox";
import { buttonBox } from "../../type";
import { useDeviceStore } from "../../store/deviceStore";
import { useUploadStore } from "../../store/upload";
import ImageReviewBox from "./ImageReviewBox";
import AddComponent from "./AddComponent";

const ButtonBox = ({ currentDevice }: buttonBox) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [imageReview, setImageReview] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(
    currentDevice?.available_quantity
  );
  const { uploadImage } = useUploadStore();
  const { updateDevice, deleteDevice, toggleUpdate } = useDeviceStore();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showAddDevice, setShowAddDevice] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = event.target.files;
      const response = await uploadImage(files);
      if (response) {
        setImageUrls(response);
        setImageReview(true);
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
        <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-10">
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
          className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-10"
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
      <button
        className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          handleUploadClick();
        }}
      >
        ფოტოების ატვირთვა
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
      />
      {imageReview && (
        <div
          id="updateQuantity"
          className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-center z-10"
        >
          <ImageReviewBox
            setImageReview={setImageReview}
            imageUrls={imageUrls}
            device={currentDevice}
          />
        </div>
      )}
      <button
        className="px-2 py-2 bg-green text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          setShowForm(true);
        }}
      >
        მოწყობილობის განახლება
      </button>
      {showForm && (
        <div
          id="updateQuantity"
          className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-center  z-10"
        >
          <Form status="updating" setShowForm={setShowForm} />
        </div>
      )}
      <button
        className="px-2 py-2 bg-SpaceBattleBlue text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          setShowCalculator(true);
        }}
      >
        კალკულატორი
      </button>
      {showCalculator && (
        <div
          id="updateQuantity"
          className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-center  z-10"
        >
          <Calculator setShowCalculator={setShowCalculator} />
        </div>
      )}
      <button
        className="px-2 py-2 bg-green text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          setShowAddDevice(true);
        }}
      >
        მოწყობილობის დამატება
      </button>
      {showAddDevice && (
        <div
          id="updateQuantity"
          className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-center  z-10"
        >
          <AddComponent setShowAddDevice={setShowAddDevice} />
        </div>
      )}
    </div>
  );
};

export default ButtonBox;
