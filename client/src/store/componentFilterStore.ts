import { create } from "zustand";
import { filterState } from "../type";

// Initial state
const initialState: Omit<filterState, "setFilter"> = {
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
export const useFilterStore = create<filterState>((set) => ({
  ...initialState,
  setFilter: (filterBy, value) =>
    set((state) => ({
      ...state,
      [filterBy]: value,
    })),
}));
