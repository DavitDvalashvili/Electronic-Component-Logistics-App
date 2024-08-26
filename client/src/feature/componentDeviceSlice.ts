import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IComponentDevice, initialComponentDevice } from "../type";

const initialState: initialComponentDevice = {
  loading: false,
  devices: [],
  error: "",
};

// API base URL
const Api_Url = "http://localhost:3000/api";

export const getDevices = createAsyncThunk(
  "componentDevice/getDevices",
  async (id: string) => {
    const response = await axios.get(`${Api_Url}/component-device/get/${id}`);
    const data = response.data;
    return data;
  }
);

const componentDeviceSlice = createSlice({
  name: "componentDevice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDevices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getDevices.fulfilled,
      (state, action: PayloadAction<IComponentDevice[]>) => {
        state.loading = false;
        state.devices = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getDevices.rejected, (state, action) => {
      state.loading = false;
      state.devices = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default componentDeviceSlice.reducer;
