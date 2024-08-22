import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  filterTerm: string;
}

const initialState: FiltersState = {
  name: "",
  family: "",
  package_type: "",
  nominal_value: "",
  electrical_supply: "",
  suppliers_name: "",
  filterTerm: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ filterBy: FilterKey; value: string }>
    ) => {
      state[action.payload.filterBy] = action.payload.value;
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
