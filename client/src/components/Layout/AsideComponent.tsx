import { useRef, useState } from "react";
import UpdateQuantityBox from "../UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "../component/Form";
import DeleteBox from "../DeleteBox";
import { buttonBoxProps } from "../../type";
import { useComponentStore } from "../../store/componentStore";
import { useUploadStore } from "../../store/upload";
import ImageReviewBox from "../component/ImageReviewBox";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FaRegFileImage } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { LuFileSpreadsheet } from "react-icons/lu";

const AsideComponent = ({ currentComponent }: buttonBoxProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [imageReview, setImageReview] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(
    currentComponent?.available_quantity
  );
  const { updateComponent, deleteComponent, toggleUpdate } =
    useComponentStore();
  const { uploadImage, uploadPDF } = useUploadStore();
  const [showForm, setShowForm] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

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
        toggleUpdate();
      }
    }
  };

  const handleUploadClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleUploadPdfClick = () => {
    if (pdfInputRef.current) {
      pdfInputRef.current.click();
    }
  };

  return (
    <div
      className={`absolute h-full top-0 left-0 z-20 ${
        showSideBar ? "bg-AntarcticDeep" : ""
      }`}
    >
      <div
        className="text-white flex justify-center items-center gap-5 text-[20px] px-10 py-5 cursor-pointer w-[259.344px] "
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        <span>{showSideBar ? "დამალვა" : "გამოჩენა"}</span>
        {showSideBar ? (
          <MdKeyboardDoubleArrowLeft className="text-red-600 text-[35px]" />
        ) : (
          <MdKeyboardDoubleArrowRight className="text-red-600 text-[40px]" />
        )}
      </div>
      {showSideBar && (
        <aside className="flex flex-col gap-5 pt-10 p-5 bg-AntarcticDeep ">
          <button
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              setShowDelete(true);
            }}
          >
            <MdOutlineDelete className="text-[16px]" />
            <span> წაშლა</span>
          </button>
          {showDelete && (
            <div className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-10">
              <DeleteBox
                setShowDelete={setShowDelete}
                handleDelete={handleDelete}
                name={currentComponent.name}
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
            <span> რაოდენობის განახლება</span>
          </button>
          {showPopup && (
            <div
              id="updateQuantity"
              className="w-full h-full fixed top-0 left-0 bg-blackLight flex justify-center items-center z-10"
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
            className="px-2 py-2 text-white rounded-md cursor-pointer text-sm flex justify-start items-start gap-4"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <GrUpdate className="text-[16px]" />
            <span>კომპონენტის განახლება</span>
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
              handleUploadPdfClick();
            }}
          >
            <LuFileSpreadsheet className="text-16px" />
            <span>DataSheet ატვირთვა</span>
          </button>
          <input
            type="file"
            ref={pdfInputRef}
            onChange={handlePdfChange}
            className="hidden"
          />
        </aside>
      )}
    </div>
  );
};

export default AsideComponent;
