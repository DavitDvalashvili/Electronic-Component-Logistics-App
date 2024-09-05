import axios from "axios";
import { create } from "zustand";
import { device, deviceState } from "../type";
import { showSuccess, showError } from "../toast/ToastUtils";

// API base URL
const Api_Url = "http://localhost:3000/api";

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
  isUpdate: false,
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
      const response = await axios.get(`${Api_Url}/devices/get/`, {
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
      const response = await axios.get(`${Api_Url}/devices/get/`);
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
      const response = await axios.get(`${Api_Url}/devices/get/${id}`);
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
        `${Api_Url}/devices/update/${id}`,
        updatedData
      );
      set((state) => ({
        device: { ...state.device, ...response.data },
      }));
      showSuccess("მოწყობილობა განახლდა წარმატებით");
    } catch (error) {
      console.error("Error updating device:", error);
      showError("შეცდომა მოწყობილობის განახლებისას");
    }
  },

  // Add a new device
  addDevice: async (newDevice: device) => {
    try {
      const response = await axios.post(`${Api_Url}/devices/add`, newDevice);
      set((state) => ({
        devices: [...state.devices, response.data],
      }));
      showSuccess("მოწყობილობა დაემატა წარმატებით");
    } catch (error) {
      console.error("Error adding device:", error);
      showError("შეცდომა მოწყობილობის დამატებისას");
    }
  },

  // Delete a device
  deleteDevice: async (id: string) => {
    try {
      await axios.delete(`${Api_Url}/devices/delete/${id}`);
      set((state) => ({
        devices: state.devices.filter((dev) => dev.id !== id),
      }));
      showSuccess("მოწყობილობა წაიშალა წარმატებით");
    } catch (error) {
      console.error("Error deleting device:", error);
      showError("შეცდომა მოწყობილობის წაშლისას");
    }
  },

  // Toggle update mode
  toggleUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
  toggleShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
}));
