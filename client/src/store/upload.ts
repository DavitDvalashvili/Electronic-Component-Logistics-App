import axios from "axios";
import { create } from "zustand";

// API base URL
const Api_Url = "http://localhost:3000/api";

export const useUploadStore = create(() => ({
  // Upload files and update component images
  uploadImage: async (files: FileList) => {
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post(`${Api_Url}/uploadImage`, formData);

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
  uploadPDF: async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${Api_Url}/uploadPDF`, formData);

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
