import { useRef, useState } from "react";
import UpdateQuantityBox from "../UpdateQuantityBox";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../device/Form";
import Calculator from "../device/Calculator";
import DeleteBox from "../DeleteBox";
import { buttonBox } from "../../type";
import { useDeviceStore } from "../../store/deviceStore";
import { useUploadStore } from "../../store/files";
import ImageReviewBox from "../device/ImageReviewBox";
import AddComponent from "../device/LinkComponent";
import { MdOutlineDelete } from "react-icons/md";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { SlCalculator } from "react-icons/sl";
import { IoIosLink } from "react-icons/io";
import { motion } from "framer-motion";
import CameraCapture from "../device/CameraCapture";
import { MdAddAPhoto } from "react-icons/md";

const AsideDevice = ({ currentDevice }: buttonBox) => {
  const { id } = useParams();
  // State management for different popups and modals
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [imageReview, setImageReview] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(
    currentDevice?.available_quantity
  );
  const { uploadImage } = useUploadStore();
  const { updateDevice, deleteDevice, getDevice } = useDeviceStore();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showAddDevice, setShowAddDevice] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showCameraCapture, setShowCameraCapture] = useState<boolean>(false);
  const { showSideBar } = useDeviceStore();

  const navigate = useNavigate();

  // Function to handle quantity update
  const handleClick = async () => {
    if (currentDevice) {
      await updateDevice({
        ...currentDevice,
        available_quantity: quantity,
      });
      getDevice(`${id}`);
    }
  };

  // Function to handle device deletion
  const handleDelete = () => {
    if (currentDevice) {
      deleteDevice(currentDevice.id);
      navigate("/devices");
    }
  };

  // Function to handle file input change and upload
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

  // Function to trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div className="fixed w-fit min-h-screen h-full bg-AntarcticDeep top-[75px] left-0 z-20 ">
      <aside className="flex flex-col gap-5   p-5  sticky  top-[68px] lef-0">
        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110 "
          onClick={() => {
            setShowDelete(true);
          }}
        >
          <MdOutlineDelete className="text-[16px]" />
          {showSideBar && <span>წაშლა</span>}
        </button>
        {showDelete && (
          <div className="w-full h-full fixed top-0 left-0 bg-blackLight  flex justify-center items-center">
            <DeleteBox
              setShowDelete={setShowDelete}
              handleDelete={handleDelete}
              name={currentDevice.name}
            />
          </div>
        )}
        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110 "
          onClick={() => {
            setShowPopup(true);
          }}
        >
          <FaSortAmountUpAlt className="text-[16px]" />
          {showSideBar && <span>რაოდენობის განახლება</span>}
        </button>
        {showPopup && (
          <div
            id="updateQuantity"
            className="w-full h-full fixed top-0 left-0 bg-blackLight  flex justify-center items-center"
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
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110 "
          onClick={() => {
            handleUploadClick();
          }}
        >
          <FaRegFileImage className="text-[16px]" />
          {showSideBar && <span>ფოტოების ატვირთვა</span>}
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
            className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-10"
          >
            <ImageReviewBox
              setImageReview={setImageReview}
              imageUrls={imageUrls}
              device={currentDevice}
            />
          </div>
        )}

        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110 "
          onClick={() => {
            setShowCameraCapture(true);
          }}
        >
          <MdAddAPhoto className="text-[16px]" />
          {showSideBar && <span>ფოტოების ატვირთვა</span>}
        </button>

        {showCameraCapture && (
          <div
            id="updateQuantity"
            className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-20"
          >
            <CameraCapture
              setShowCameraCapture={setShowCameraCapture}
              device={currentDevice}
            />
          </div>
        )}

        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <GrUpdate className="text-[16px]" />
          {showSideBar && <span>მოწყობილობის განახლება</span>}
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
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110"
          onClick={() => {
            setShowCalculator(true);
          }}
        >
          <SlCalculator className="text-16px" />
          {showSideBar && <span>კალკულატორი</span>}
        </button>
        {showCalculator && (
          <div
            id="updateQuantity"
            className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-3"
          >
            <Calculator setShowCalculator={setShowCalculator} />
          </div>
        )}
        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
          transition-transform duration-200 hover:shadow-lg hover:scale-110 "
          onClick={() => {
            setShowAddDevice(true);
          }}
        >
          <IoIosLink className="text-[16px]" />
          {showSideBar && <span>კომპონენტის დაკავშირება</span>}
        </button>
        {showAddDevice && (
          <div
            id="updateQuantity"
            className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-10 "
          >
            <AddComponent setShowAddDevice={setShowAddDevice} />
          </div>
        )}
      </aside>
    </motion.div>
  );
};

export default AsideDevice;
