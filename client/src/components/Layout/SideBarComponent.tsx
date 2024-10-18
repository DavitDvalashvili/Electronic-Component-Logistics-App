import { useRef, useState } from "react";
import UpdateQuantityBox from "../UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "../component/Form";
import DeleteBox from "../DeleteBox";
import { buttonBoxProps } from "../../type";
import { useComponentStore } from "../../store/componentStore";
import { useUploadStore } from "../../store/upload";
import ImageReviewBox from "../component/ImageReviewBox";
import { MdAddAPhoto } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useDeviceStore } from "../../store/deviceStore";
import { useParams } from "react-router-dom";
import CameraCapture from "../component/CameraCapture";

const SideBarComponent = ({ currentComponent }: buttonBoxProps) => {
  const { id } = useParams();
  // State variables for managing component popups and file inputs
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [imageReview, setImageReview] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string>("");
  const [showCameraCapture, setShowCameraCapture] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(
    currentComponent?.available_quantity
  );

  // Access functions and state from stores
  const { updateComponent, deleteComponent, getComponent } =
    useComponentStore();
  const { uploadImage, uploadPDF } = useUploadStore();
  const [showForm, setShowForm] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const { showSideBar } = useDeviceStore();
  const navigate = useNavigate();

  // Update component quantity
  const handleClick = async () => {
    if (currentComponent) {
      await updateComponent({
        ...currentComponent,
        available_quantity: quantity,
        receipt_date: currentComponent.receipt_date.split("T")[0],
      });
      await getComponent(`${id}`);
    }
  };

  // Delete component and navigate to components page
  const handleDelete = async () => {
    if (currentComponent) {
      await deleteComponent(currentComponent.id);
      navigate("/components");
    }
  };

  // Handle image file upload
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

  // Handle PDF file upload
  const handlePdfChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const response = await uploadPDF(file);
      if (response) {
        await updateComponent({
          ...currentComponent,
          data_sheet: response,
        });
        await getComponent(`${id}`);
      }
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  //Trigger file upload
  const handleUploadPdfClick = () => {
    if (pdfInputRef.current) {
      pdfInputRef.current.click();
    }
  };

  return (
    <div className="fixed w-fit min-h-screen h-full bg-AntarcticDeep top-[75px] left-0  z-20">
      <aside className="flex flex-col gap-5   p-5  sticky  top-[68px] lef-0">
        <button
          className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4
           transition-transform duration-200 hover:shadow-lg hover:scale-110"
          onClick={() => {
            setShowDelete(true);
          }}
        >
          <MdOutlineDelete className="text-[16px]" />
          {showSideBar && <span> წაშლა</span>}
        </button>
        {showDelete && (
          <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center ">
            <DeleteBox
              setShowDelete={setShowDelete}
              handleDelete={handleDelete}
              name={currentComponent.name}
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
          {showSideBar && <span> რაოდენობის განახლება</span>}
        </button>
        {showPopup && (
          <div
            id="updateQuantity"
            className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-20"
          >
            <UpdateQuantityBox
              setShowPopup={setShowPopup}
              quantity={currentComponent.available_quantity}
              setQuantity={setQuantity}
              handleClick={handleClick}
              name={currentComponent.name}
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
              component={currentComponent}
            />
          </div>
        )}

        <input
          type="file"
          ref={imageInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        {imageReview && (
          <div
            id="updateQuantity"
            className="w-full h-full fixed top-0 left-0 bg-blackLight min-h-screen flex justify-center items-center z-10"
          >
            <ImageReviewBox
              setImageReview={setImageReview}
              imageUrls={imageUrls}
              component={currentComponent}
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
          {showSideBar && <span>კომპონენტის განახლება</span>}
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
           transition-transform duration-200 hover:shadow-lg hover:scale-110 "
          onClick={() => {
            handleUploadPdfClick();
          }}
        >
          <LuFileSpreadsheet className="text-16px" />
          {showSideBar && <span>DataSheet ატვირთვა</span>}
        </button>
        <input
          type="file"
          ref={pdfInputRef}
          onChange={handlePdfChange}
          className="hidden"
        />
      </aside>
    </div>
  );
};

export default SideBarComponent;
