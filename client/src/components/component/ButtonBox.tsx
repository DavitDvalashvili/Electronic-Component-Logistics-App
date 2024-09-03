import { useRef, useState } from "react";
import UpdateQuantityBox from "./../UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "./../component/Form";
import DeleteBox from "./../DeleteBox";
import { buttonBoxProps } from "../../type";
import { useComponentStore } from "../../store/componentStore";
import { useUploadStore } from "../../store/upload";
import ImageReviewBox from "./ImageReviewBox";

const ButtonBox = ({ currentComponent }: buttonBoxProps) => {
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
        className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          handleUploadClick();
        }}
      >
        ფოტოების ატვირთვა
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
          className="w-full h-full fixed top-0 left-0 bg-blackLight min-h-screen flex justify-center items-top  z-10"
        >
          <Form status="updating" setShowForm={setShowForm} />
        </div>
      )}
      <button
        className="px-2 py-2 bg-SpaceBattleBlue text-white rounded-md cursor-pointer text-sm"
        onClick={() => {
          handleUploadPdfClick();
        }}
      >
        DataSheet ატვირთვა
      </button>
      <input
        type="file"
        ref={pdfInputRef}
        onChange={handlePdfChange}
        className="hidden"
      />
    </div>
  );
};

export default ButtonBox;
