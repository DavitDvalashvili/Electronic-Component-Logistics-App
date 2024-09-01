import { useEffect, useRef, useState } from "react";
import UpdateQuantityBox from "./../UpdateQuantityBox";
import { useNavigate } from "react-router-dom";
import Form from "./../component/Form";
import DeleteBox from "./../DeleteBox";
import { buttonBoxProps } from "../../type";
import { useComponentStore } from "../../store/componentStore";
import ImageReviewBox from "../ImageReviewBox";
//import axios from "axios";

const ButtonBox = ({ currentComponent }: buttonBoxProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [imageReview, setImageReview] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(
    currentComponent?.available_quantity
  );
  const { updateComponent, deleteComponent, toggleUpdate, uploadFiles } =
    useComponentStore();
  const [showForm, setShowForm] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  // Handle file change event
  const [files, setFiles] = useState<FileList | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setFiles(event.target.files);
  //   }
  //   handleUpload();
  // };

  // // Handle file upload and update component with new image URLs
  // const handleUpload = async () => {
  //   if (files && currentComponent) {
  //     // Upload files and get filenames
  //     await uploadFiles(files).then((response) => {
  //       console.log(response);
  //       if (response) {
  //         // Assuming response.data contains the filenames
  //         const image_urls = response;

  //         // Update component with the new image URLs
  //         updateComponent({
  //           ...currentComponent,
  //           images_urls: image_urls, // Join filenames to a single string if required
  //         });

  //         toggleUpdate();
  //       }
  //     });
  //   }
  // };

  // const handleUploadClick = async () => {
  //   if (fileInputRef.current) {
  //     handleUpload();
  //   }
  // };

  // Handle file change event
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      // Upload files and get filenames
      const files = event.target.files;
      const response = await uploadFiles(files);
      console.log(response);
      if (response) {
        const image_urls = response; // Assuming response.data contains the filenames
        setImageUrls(image_urls); // Save image URLs
        setImageReview(true); // Show image review box
        updateComponent({
          ...currentComponent,
          images_urls: image_urls,
        });
        toggleUpdate();
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  /////////fileupload functionality

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
            name={currentComponent.name}
          />
        </div>
      )}
      {/* <button
        className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm"
        onClick={handleUpload}
      >
        ფოტოს დამატება
      </button>
      <input type="file" onChange={handleFileChange} multiple id="fileInput" /> */}
      {/* <button
        className="px-2 py-2 bg-NorthAtlanticBreeze text-white rounded-md cursor-pointer text-sm"
        onClick={handleUpload}
      >
        ფოტოს დამატება
      </button>
       */}
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
          className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-top  z-10"
        >
          <ImageReviewBox
            setImageReview={setImageReview}
            imageUrls={imageUrls}
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
          className="w-full h-full absolute top-0 left-0 bg-blackLight min-h-screen flex justify-center items-top  z-10"
        >
          <Form status="updating" setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
};

export default ButtonBox;
