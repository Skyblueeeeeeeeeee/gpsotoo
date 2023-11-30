import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/auth.slice";
import deviceSlice from "./services/device.slice";
import telemetrySlice from "./services/telemetry.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    device: deviceSlice,
    telemetry: telemetrySlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
