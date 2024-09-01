import axios from "axios";
import { create } from "zustand";
import { componentState } from "../type";

// API base URL
const Api_Url = "http://localhost:3000/api";

export const useComponentStore = create<componentState>((set) => ({
  loading: false,
  components: [],
  allComponents: [],
  component: null,
  error: "",
  name: "",
  family: "",
  package_type: "",
  nominal_value: "",
  electrical_supply: "",
  suppliers_name: "",
  search_term: "",
  files: "",
  page: "1",
  isUpdate: false,

  getComponents: async (params) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/components/get/`, {
        params,
      });

      set({ components: response.data, error: "" });
    } catch (error) {
      console.error("Error fetching components:", error);
      set({ components: [], error: error.message || "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all components
  getAllComponents: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/components/get/`);
      set({ allComponents: response.data, error: "" });
    } catch (error) {
      set({
        allComponents: [],
        error: error.message || "Something went wrong",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single component by ID
  getComponent: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/components/get/${id}`);
      set({ component: response.data, error: "" });
    } catch (error) {
      set({ component: null, error: error.message || "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },

  // Update a single component
  updateComponent: async (component) => {
    try {
      const { id, ...updatedData } = component;
      const response = await axios.put(
        `${Api_Url}/components/update/${id}`,
        updatedData
      );
      set((state) => ({
        component: { ...state.component, ...response.data },
      }));
      console.log("Updated component:", response.data);
    } catch (error) {
      console.error("Error updating component:", error);
    }
  },

  // Add a new component
  addComponent: async (newComponent) => {
    try {
      const response = await axios.post(
        `${Api_Url}/components/add`,
        newComponent
      );
      set((state) => ({
        components: [...state.components, response.data],
      }));
    } catch (error) {
      console.error("Error adding component:", error);
    }
  },

  // Delete a component
  deleteComponent: async (id) => {
    try {
      await axios.delete(`${Api_Url}/components/delete/${id}`);
      set((state) => ({
        components: state.components.filter((comp) => comp.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting component:", error);
    }
  },

  // Upload files and update component images
  uploadFiles: async (files: FileList) => {
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post(`${Api_Url}/upload`, formData);

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

  // Toggle update mode
  toggleUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
}));
