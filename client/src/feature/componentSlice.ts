import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateComponent, IComponent } from "../type";

// API base URL
const Api_Url = "http://localhost:3000/api";

// Define initial state for components slice
const initialState: InitialStateComponent = {
  loading: false,
  components: [],
  error: "",
  name: "",
  family: "",
  package_type: "",
  nominal_value: "",
  electrical_supply: "",
  suppliers_name: "",
  search_term: "",
};

// Async thunk to fetch components
export const getComponents = createAsyncThunk(
  "components/getComponents",
  async ({
    name,
    family,
    package_type,
    nominal_value,
    electrical_supply,
    suppliers_name,
    search_term,
  }: {
    name: string;
    family: string;
    package_type: string;
    nominal_value: string;
    electrical_supply: string;
    suppliers_name: string;
    search_term: string;
  }) => {
    const params = new URLSearchParams({
      name,
      family,
      package_type,
      nominal_value,
      electrical_supply,
      suppliers_name,
      search_term,
    }).toString();

    const response = await axios.get(`${Api_Url}/components/get/?${params}`);
    console.log(params);
    return response.data;
  }
);

export const getComponent = createAsyncThunk(
  "components/getComponent",
  async (id: string) => {
    const response = await axios.get(`${Api_Url}/components/get/${id}`);
    const data = response.data;

    return data;
  }
);

// Create slice with reducers and extra reducers
const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    filterByName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    filterByFamily: (state, action: PayloadAction<string>) => {
      state.family = action.payload;
    },
    filterByPackageType: (state, action: PayloadAction<string>) => {
      state.package_type = action.payload;
    },
    filterByNominalValue: (state, action: PayloadAction<string>) => {
      state.nominal_value = action.payload;
    },
    filterByElectricalSupply: (state, action: PayloadAction<string>) => {
      state.electrical_supply = action.payload;
    },
    filterBySupplierName: (state, action: PayloadAction<string>) => {
      state.suppliers_name = action.payload;
    },
    searchTermChange: (state, action: PayloadAction<string>) => {
      state.search_term = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComponents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getComponents.fulfilled,
      (state, action: PayloadAction<IComponent[]>) => {
        state.loading = false;
        state.components = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getComponents.rejected, (state, action) => {
      state.loading = false;
      state.components = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(getComponent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getComponent.fulfilled,
      (state, action: PayloadAction<IComponent[]>) => {
        state.loading = false;
        state.components = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getComponent.rejected, (state, action) => {
      state.loading = false;
      state.components = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default componentSlice.reducer;
export const {
  filterByName,
  filterByFamily,
  filterByPackageType,
  filterByNominalValue,
  filterByElectricalSupply,
  filterBySupplierName,
  searchTermChange,
} = componentSlice.actions;
