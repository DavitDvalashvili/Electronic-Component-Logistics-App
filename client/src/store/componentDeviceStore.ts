import { create } from "zustand";
import axios from "axios";
import { ComponentDeviceState } from "../type";
import { showError, showSuccess } from "../toast/ToastUtils";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

const useComponentDeviceStore = create<ComponentDeviceState>((set) => ({
  loading: false,
  devices: [],
  components: [],
  error: "",
  names: [],
  deviceComponents: [],

  // Fetches devices based on component ID
  getDevices: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${Api_Url}/api/component-device/component/${id}`
      );
      set({ devices: response.data, error: "", loading: false });
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        devices: [],
        error: errorMessage,
        loading: false,
      });
    }
  },

  // Fetches components based on device ID
  getComponents: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${Api_Url}/api/component-device/device/${id}`
      );
      set({ components: response.data, error: "", loading: false });
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        components: [],
        error: errorMessage,
        loading: false,
      });
    }
  },

  // Fetches component names
  getComponentsNames: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${Api_Url}/api/component-device/component-names`
      );
      set({ names: response.data, error: "", loading: false });
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        names: [],
        error: errorMessage,
        loading: false,
      });
    }
  },

  // Adds a new device-component
  addDeviceComponent: async (deviceComponent) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        `${Api_Url}/api/component-device/add`,
        deviceComponent
      );
      set((state) => ({
        components: [...state.deviceComponents, response.data],
        loading: false,
        error: "",
      }));
      showSuccess("კომპონენტი დაემატა წარმატებით");
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      showError("შეცდომა კომპონენტის დამატებისას");

      set({ error: errorMessage, loading: false });
    }
  },

  // Deletes a device-component
  deleteComponent: async (id) => {
    try {
      await axios.delete(`${Api_Url}/api/component-device/delete/${id}`);
      set((state) => ({
        deviceComponents: state.deviceComponents.filter(
          (comp) => comp.device_component_id !== id
        ),
      }));
      showSuccess("კომპონენტი წაიშალა წარმატებით");
    } catch (error) {
      console.error("Error deleting component:", error);
      showError("შეცდომა კომპონენტის წაშლისას");
    }
  },
}));

export default useComponentDeviceStore;
