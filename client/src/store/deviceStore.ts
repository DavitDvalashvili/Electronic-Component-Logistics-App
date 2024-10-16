import axios from "axios";
import { create } from "zustand";
import { device, deviceState } from "../type";
import { showSuccess, showError } from "../toast/ToastUtils";

// Base API URL from environment variables
const Api_Url = import.meta.env.VITE_API_URL;

export const useDeviceStore = create<deviceState>((set) => ({
  loading: false,
  devices: [],
  allDevices: [],
  device: null,
  error: "",
  name: "",
  electrical_supply: "",
  size: "",
  search_term: "",
  page: "1",
  showSideBar: false,

  // Fetch devices with filters
  getDevices: async (params: {
    name: string;
    electrical_supply: string;
    size: string;
    search_term: string;
    page: string;
  }) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/api/devices/get/`, {
        params,
      });
      set({ devices: response.data, error: "" });
    } catch (error) {
      console.error("Error fetching devices:", error);
      set({
        devices: [],
        error: (error as Error).message || "Something went wrong",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch all devices
  getAllDevices: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/api/devices/get/`);
      set({ allDevices: response.data, error: "" });
    } catch (error) {
      set({
        allDevices: [],
        error: (error as Error).message || "Something went wrong",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single device by ID
  getDevice: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${Api_Url}/api/devices/get/${id}`);
      set({ device: response.data, error: "" });
    } catch (error) {
      set({
        device: null,
        error: (error as Error).message || "Something went wrong",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Update a single device
  updateDevice: async (device: device) => {
    try {
      const { id, ...updatedData } = device;
      const response = await axios.put(
        `${Api_Url}/api/devices/update/${id}`,
        updatedData
      );
      set((state) => ({
        device: { ...state.device, ...response.data },
      }));
      showSuccess("მოწყობილობა განახლდა წარმატებით");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          showError("მოწყობილობა ამ სახელით უკვე არსებობს");
        }
      } else {
        console.error("Error updating device:", error);
        showError("შეცდომა მოწყობილობის განახლებისას");
      }
    }
  },

  // Add a new device
  addDevice: async (newDevice: device) => {
    try {
      const response = await axios.post(
        `${Api_Url}/api/devices/add`,
        newDevice
      );
      set((state) => ({
        devices: [...state.devices, response.data],
      }));
      showSuccess("მოწყობილობა დაემატა წარმატებით");
    } catch (error) {
      // Check if the error is an AxiosError and has a response
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          showError("მოწყობილობა ამ სახელით უკვე არსებობს");
        }
      } else {
        console.error("Error adding device:", error);
        showError("შეცდომა მოწყობილობის დამატებისას");
      }
    }
  },

  // Delete a device
  deleteDevice: async (id: string) => {
    try {
      await axios.delete(`${Api_Url}/api/devices/delete/${id}`);
      set((state) => ({
        devices: state.devices.filter((dev) => dev.id !== id),
      }));
      showSuccess("მოწყობილობა წაიშალა წარმატებით");
    } catch (error) {
      console.error("Error deleting device:", error);
      showError("შეცდომა მოწყობილობის წაშლისას");
    }
  },

  toggleShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
}));
