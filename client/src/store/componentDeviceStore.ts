import { create } from "zustand";
import axios from "axios";
import { ComponentDeviceState } from "../type";

const Api_Url = "http://localhost:3000/api";

const useComponentDeviceStore = create<ComponentDeviceState>((set) => ({
  loading: false,
  devices: [],
  components: [],
  error: "",
  getDevices: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${Api_Url}/component-device/component/${id}`
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
  getComponents: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${Api_Url}/component-device/device/${id}`
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
}));

export default useComponentDeviceStore;
