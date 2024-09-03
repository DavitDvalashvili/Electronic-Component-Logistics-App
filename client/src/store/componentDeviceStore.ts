import { create } from "zustand";
import axios from "axios";
import { ComponentDeviceState } from "../type";

const Api_Url = "http://localhost:3000/api";

const useComponentDeviceStore = create<ComponentDeviceState>((set) => ({
  loading: false,
  devices: [],
  components: [],
  error: "",
  names: [],
  isUpdate: false,
  deviceComponents: [],

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
  getComponentsNames: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${Api_Url}/component-device/component-names`
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

  addDeviceComponent: async (deviceComponent) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        `${Api_Url}/component-device/add`,
        deviceComponent
      );
      set((state) => ({
        components: [...state.deviceComponents, response.data],
        loading: false,
        error: "",
      }));
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({ error: errorMessage, loading: false });
    }
  },
  toggleUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
}));

export default useComponentDeviceStore;
