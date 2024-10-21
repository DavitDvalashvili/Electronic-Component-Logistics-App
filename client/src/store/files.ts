import axios from "axios";
import { create } from "zustand";
import { imageDataType, imageState } from "../type";
import { showError, showSuccess } from "../toast/ToastUtils";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

// Zustand store for file uploads
export const useUploadStore = create<imageState>((set) => ({
  images: [],

  updateImage: async (imageData: imageDataType) => {
    try {
      const response = await axios.put(
        `${Api_Url}/api/file/addImages`,
        imageData
      );
      showSuccess("სურათი წარმატებით აიტვირთა");
      return response.data;
    } catch (error) {
      console.error("Error adding images:", error);
      showError("შეცდომა სურათის ატვირთვისას");
    }
  },

  // Upload files and update component images
  uploadImage: async (files: FileList) => {
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post(
        `${Api_Url}/api/file/uploadImage`,
        formData
      );

      if (response && response.status === 200) {
        const { filenames } = response.data;
        return filenames.toString();
      } else {
        console.error("Upload failed or response is missing data.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  },

  deleteImage: async (id: string) => {
    try {
      await axios.delete(`${Api_Url}/api/file/deleteImage/${id}`);
      set((state) => ({
        images: state.images.filter((image) => image.image_id !== id),
      }));
      showSuccess("სურათი წარმატებით წაიშალა");
    } catch (error) {
      console.error("Error Deleting image", error);
      showError("შეცდომა სურათის წაშლისას");
    }
  },

  // Upload a single PDF file and return the filename
  uploadPDF: async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${Api_Url}/api/file/uploadPDF`,
        formData
      );

      if (response && response.status === 200) {
        const { filename } = response.data;

        return filename;
      } else {
        console.error("Upload failed or response is missing data.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  },
}));
