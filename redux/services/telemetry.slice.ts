import { thingsboard } from "@/lib/tbClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TbEntity } from "thingsboard-api-client";

interface TelemetryState {
  getTimeseries: {
    loading: boolean;
    data: any;
    error: boolean;
  };
}

const initialState: TelemetryState = {
  getTimeseries: {
    loading: false,
    data: null,
    error: false,
  },
};

export const getTimeseries = createAsyncThunk(
  "get/telemetry/timeseries",
  async (props: {
    token: string;
    path: { entityId: string; entityType: TbEntity };
    query: {
      keys: string;
      startTs: number;
      endTs: number;
    };
  }) => {
    const resp = await thingsboard
      .telemetry()
      .getTimeseries(props.token, props.path, props.query);
    return resp;
  }
);

export const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getTimeseries.pending, (state: TelemetryState) => {
      state.getTimeseries.loading = true;
    });
    builder.addCase(
      getTimeseries.fulfilled,
      (state: TelemetryState, action: any) => {
        state.getTimeseries.data = action.payload;
        state.getTimeseries.loading = false;
      }
    );
    builder.addCase(getTimeseries.rejected, (state: TelemetryState) => {
      state.getTimeseries.loading = false;
      state.getTimeseries.error = true;
    });
  },
});

export const selectTelemetryTimeseries = (state: RootState) =>
  state.telemetry.getTimeseries;

export default telemetrySlice.reducer;
