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
      const response = await axios.put(`${Api_Url}/api/addImages`, imageData);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding images:", error);
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
      const response = await axios.post(`${Api_Url}/api/uploadImage`, formData);

      if (response && response.status === 200) {
        const { filenames } = response.data;
        console.log(response.data);
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
      await axios.delete(`${Api_Url}/api/delete/${id}`);
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
      const response = await axios.post(`${Api_Url}/api/uploadPDF`, formData);

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
