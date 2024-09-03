import { useRef, useState } from "react";
import UpdateQuantityBox from "../UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "../device/Form";
import Calculator from "../device/Calculator";
import DeleteBox from "../DeleteBox";
import { buttonBox } from "../../type";
import { useDeviceStore } from "../../store/deviceStore";
import { useUploadStore } from "../../store/upload";
import ImageReviewBox from "../device/ImageReviewBox";
import AddComponent from "../device/LinkComponent";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { SlCalculator } from "react-icons/sl";
import { IoIosLink } from "react-icons/io";

const AsideDevice = ({ currentDevice }: buttonBox) => {
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
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

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
    <div
      className={`absolute top-0 left-0 z-20 min-h-screen h-full ${
        showSideBar ? "bg-AntarcticDeep" : ""
      }`}
    >
      <div
        className="text-white  flex justify-center items-center gap-5 text-[20px] px-10 py-5 cursor-pointer w-[259.344px] "
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        <span>{showSideBar ? "დამალვა" : "გამოჩენა"}</span>
        {showSideBar ? (
          <MdKeyboardDoubleArrowLeft className="text-red-600 text-[35px]" />
        ) : (
          <MdKeyboardDoubleArrowRight className="text-red-600 text-[35px]" />
        )}
      </div>
      {showSideBar && (
        <aside className="flex flex-col gap-5 pt-10 p-5 bg-AntarcticDeep">
          <button
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              setShowDelete(true);
            }}
          >
            <MdOutlineDelete className="text-[16px]" />
            <span>წაშლა</span>
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
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            <FaSortAmountUpAlt className="text-[16px]" />
            <span>რაოდენობის განახლება</span>
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
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              handleUploadClick();
            }}
          >
            <FaRegFileImage className="text-[16px]" />
            <span>ფოტოების ატვირთვა</span>
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
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <GrUpdate className="text-[16px]" />
            <span>მოწყობილობის განახლება</span>
          </button>
          {showForm && (
            <div
              id="updateQuantity"
              className="w-full h-full fixed top-0 left-0 bg-blackLight min-h-screen flex justify-center items-top  z-10"
            >
              <Form status="updating" setShowForm={setShowForm} />
            </div>
          )}
          <button
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              setShowCalculator(true);
            }}
          >
            <SlCalculator className="text-16px" />
            <span>კალკულატორი</span>
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
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              setShowAddDevice(true);
            }}
          >
            <IoIosLink className="text-[16px]" />
            <span>კომპონენტის დაკავშირება</span>
          </button>
          {showAddDevice && (
            <div
              id="updateQuantity"
              className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-center  z-10"
            >
              <AddComponent setShowAddDevice={setShowAddDevice} />
            </div>
          )}
        </aside>
      )}
    </div>
  );
};

export default AsideDevice;
