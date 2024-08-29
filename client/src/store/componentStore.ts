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
  page: "1",
  isUpdate: false,

  getComponents: async (params) => {
    set({ loading: true });
    try {
      console.log("Fetching components with params:", params);
      const response = await axios.get(`${Api_Url}/components/get/`, {
        params,
      });
      console.table(params);
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

  // Update a component
  updateComponent: async (component) => {
    try {
      const { id, ...updatedData } = component;
      //console.log("Updating component with ID:", id, "Data:", updatedData);
      const response = await axios.put(
        `${Api_Url}/components/update/${id}`,
        updatedData
      );
      //console.log("Update response:", response.data);

      set((state) => {
        const updatedComponents = state.components.map((comp) =>
          comp.id === id ? response.data : comp
        );
        // console.log("Updated components:", updatedComponents);
        return { components: updatedComponents };
      });
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

  // Toggle update mode
  toggleUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
}));
