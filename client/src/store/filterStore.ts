import { create } from "zustand";
import { componentFilterState, deviceFilterState } from "../type";

// Initial state
const initialComponentState: Omit<componentFilterState, "setComponentFilter"> =
  {
    name: "",
    family: "",
    package_type: "",
    nominal_value: "",
    electrical_supply: "",
    suppliers_name: "",
    search_term: "",
    page: "1",
  };

// Create the Zustand store
export const useComponentFilterStore = create<componentFilterState>((set) => ({
  ...initialComponentState,
  setComponentFilter: (filterBy, value) =>
    set((state) => ({
      ...state,
      [filterBy]: value,
    })),
}));

// Initial state
const initialDeviceState: Omit<deviceFilterState, "setDeviceFilter"> = {
  name: "",
  electrical_supply: "",
  size: "",
  search_term: "",
  page: "1",
};

// Create the Zustand store
export const useDeviceFilterStore = create<deviceFilterState>((set) => ({
  ...initialDeviceState,
  setDeviceFilter: (filterBy, value) =>
    set((state) => ({
      ...state,
      [filterBy]: value,
    })),
}));
