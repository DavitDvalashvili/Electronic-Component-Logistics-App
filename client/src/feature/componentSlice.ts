import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateComponent, IComponent } from "../type";
import { IconBaseProps } from "react-icons";

// API base URL
const Api_Url = "http://localhost:3000/api";

// Define initial state for components slice
const initialState: InitialStateComponent = {
  loading: false,
  components: [],
  allComponents: [],
  component: null,
  error: "",
  name: "",
  family: "",
  package_type: "",
  nominal_value: "",
  electrical_supply: "",
  suppliers_name: "",
  search_term: "",
  page: "1",
  isUpdate: false,
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
    page,
  }: {
    name: string;
    family: string;
    package_type: string;
    nominal_value: string;
    electrical_supply: string;
    suppliers_name: string;
    search_term: string;
    page: string;
  }) => {
    const params = new URLSearchParams({
      name,
      family,
      package_type,
      nominal_value,
      electrical_supply,
      suppliers_name,
      search_term,
      page,
    }).toString();

    const response = await axios.get(`${Api_Url}/components/get/?${params}`);
    console.log(params);
    return response.data;
  }
);

export const getAllComponents = createAsyncThunk(
  "components/getAllComponents",
  async () => {
    const response = await axios.get(`${Api_Url}/components/get/`);
    const data = response.data;
    return data;
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

export const updateComponent = createAsyncThunk(
  "components/updateComponent",
  async (payload: IComponent) => {
    const { id, ...updatedData } = payload;
    const response = await axios.put(
      `${Api_Url}/components/update/${id}`,
      updatedData
    );
    console.log(updatedData);
    return response.data;
  }
);

export const addComponent = createAsyncThunk(
  "components/addComponent",
  async (newComponent: IComponent) => {
    const response = await axios.post(
      `${Api_Url}/components/add`,
      newComponent
    );
    return response.data;
  }
);

export const deleteComponent = createAsyncThunk(
  "components/deleteComponent",
  async (component: IconBaseProps) => {
    const response = await axios.delete(
      `${Api_Url}/components/delete/${component.id}`
    );
    return response.data;
  }
);

// Create slice with reducers and extra reducers
const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    // Reducer to toggle update mode
    update: (state) => {
      state.isUpdate = !state.isUpdate;
    },
  },
  extraReducers: (builder) => {
    //for filtered components
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

    // For all components
    builder.addCase(getAllComponents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllComponents.fulfilled,
      (state, action: PayloadAction<IComponent[]>) => {
        state.loading = false;
        state.allComponents = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getAllComponents.rejected, (state, action) => {
      state.loading = false;
      state.components = [];
      state.error = action.error.message || "Something went wrong";
    });

    //for single component
    builder.addCase(getComponent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getComponent.fulfilled,
      (state, action: PayloadAction<IComponent>) => {
        state.loading = false;
        state.component = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getComponent.rejected, (state, action) => {
      state.loading = false;
      state.component = null;
      state.error = action.error.message || "Something went wrong";
    });

    // Other cases for update, delete, add, etc.
    builder.addCase(
      updateComponent.fulfilled,
      (state, action: PayloadAction<IComponent>) => {
        const index = state.components.findIndex(
          (component) => component.id === action.payload.id
        );
        if (index !== -1) {
          state.components[index] = action.payload;
        }
      }
    );
    builder.addCase(deleteComponent.fulfilled, (state, action) => {
      const index = state.components.findIndex(
        (component) => component.id === action.payload.id
      );
      state.components.splice(index, 1);
    });
    builder.addCase(addComponent.fulfilled, (state, action) => {
      const index = state.components.findIndex(
        (component) => component.id === action.payload.id
      );
      if (index !== -1) {
        state.components[index] = action.payload;
      }
    });
  },
});

export default componentSlice.reducer;

export const { update } = componentSlice.actions;
