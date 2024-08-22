import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the keys of the FiltersState type
type FilterKey =
  | "name"
  | "family"
  | "package_type"
  | "nominal_value"
  | "electrical_supply"
  | "suppliers_name";

interface FiltersState {
  name: string;
  family: string;
  package_type: string;
  nominal_value: string;
  electrical_supply: string;
  suppliers_name: string;
  search_term: string;
  page: string;
}

const initialState: FiltersState = {
  name: "",
  family: "",
  package_type: "",
  nominal_value: "",
  electrical_supply: "",
  suppliers_name: "",
  search_term: "",
  page: "1",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ filterBy: FilterKey; value: string }>
    ) => {
      const { filterBy, value } = action.payload;
      state[filterBy] = value;
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
