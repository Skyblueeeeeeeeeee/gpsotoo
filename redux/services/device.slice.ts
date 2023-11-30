import { thingsboard } from "@/lib/tbClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DeviceState {
  getDeviceById: {
    loading: boolean;
    data: any;
    error: boolean;
  };
}

const initialState: DeviceState = {
  getDeviceById: {
    loading: false,
    data: null,
    error: false,
  },
};

export const getDeviceId = createAsyncThunk(
  "get/device/id",
  async (props: { token: string; path: { deviceId: string } }) => {
    const resp = await thingsboard
      .device()
      .getDeviceInfoById(props.token, props.path);
    return resp;
  }
);

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getDeviceId.pending, (state: DeviceState) => {
      state.getDeviceById.loading = true;
    });
    builder.addCase(
      getDeviceId.fulfilled,
      (state: DeviceState, action: any) => {
        state.getDeviceById.data = action.payload;
        state.getDeviceById.loading = false;
      }
    );
    builder.addCase(getDeviceId.rejected, (state: DeviceState) => {
      state.getDeviceById.loading = false;
      state.getDeviceById.error = true;
    });
  },
});

export const selectDeviceId = (state: RootState) => state.device.getDeviceById;

export default deviceSlice.reducer;
