import axios from "axios";
import { create } from "zustand";
import { componentState } from "../type";
import { showSuccess, showError } from "../toast/ToastUtils";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

// Zustand store for component management
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

  // Fetch components based on given parameters
  getComponents: async (params) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/api/components/get/`, {
        params,
      });
      set({ components: response.data, error: "" });
    } catch (error) {
      console.error("Error fetching components:", error);

      if (error instanceof Error) {
        // error is an instance of Error, so it has a message property
        set({ components: [], error: error.message });
      } else {
        // If the error is not an instance of Error, handle it as a generic error
        set({ components: [], error: "Something went wrong" });
      }
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all components
  getAllComponents: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/api/components/get/`);
      set({ allComponents: response.data, error: "" });
    } catch (error) {
      if (error instanceof Error) {
        set({ allComponents: [], error: error.message }); // Handle Error instance
      } else {
        set({ allComponents: [], error: "Something went wrong" }); // Generic error message
      }
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single component by ID
  getComponent: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/api/components/get/${id}`);
      set({ component: response.data, error: "" });
    } catch (error) {
      if (error instanceof Error) {
        set({ component: null, error: error.message });
      } else {
        set({ component: null, error: "Something went wrong" }); // Generic error message
      }
    } finally {
      set({ loading: false });
    }
  },

  // Update a single component
  updateComponent: async (component) => {
    try {
      const { id, ...updatedData } = component;
      const response = await axios.put(
        `${Api_Url}/api/components/update/${id}`,
        updatedData
      );
      set((state) => ({
        component: { ...state.component, ...response.data },
      }));
      showSuccess("კომპონენტი განახლდა წარმატებით");
      console.log("Updated component:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          showError("კომპონენტი ამ სახელით უკვე არსებობს");
        }
      } else {
        console.error("Error updating component:", error);
        showError("შეცდომა კომპონენტის განახლებისას");
      }
    }
  },

  // Add a new component
  addComponent: async (newComponent) => {
    try {
      const response = await axios.post(
        `${Api_Url}/api/components/add`,
        newComponent
      );
      set((state) => ({
        components: [...state.components, response.data],
      }));
      showSuccess("კომპონენტი დაემატა წარმატებით");
    } catch (error) {
      // Check if the error is an AxiosError and has a response
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          showError("კომპონენტი ამ სახელით უკვე არსებობს");
        }
      } else {
        console.error("Error adding component:", error);
        showError("შეცდომა კომპონენტის დამატებისას");
      }
    }
  },

  // Delete a component
  deleteComponent: async (id) => {
    try {
      await axios.delete(`${Api_Url}/api/components/delete/${id}`);
      set((state) => ({
        components: state.components.filter((comp) => comp.id !== id),
      }));
      showSuccess("კომპონენტი წაიშალა წარმატებით");
    } catch (error) {
      console.error("Error deleting component:", error);
      showError("შეცდომა კომპონენტის წაშლისას");
    }
  },
}));
