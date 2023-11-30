import { thingsboard } from "@/lib/tbClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  getUser: {
    loading: boolean;
    data: any;
    error: boolean;
  };
}

const initialState: AuthState = {
  getUser: {
    loading: false,
    data: {},
    error: false,
  },
};

export const getAuthUser = createAsyncThunk(
  "get/auth/user",
  async (token: string = "") => {
    const resp = await thingsboard.auth().getUser(token);
    return resp;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getAuthUser.pending, (state: AuthState) => {
      state.getUser.loading = true;
    });
    builder.addCase(getAuthUser.fulfilled, (state: AuthState, action: any) => {
      state.getUser.data = action.payload;
      state.getUser.loading = false;
    });
    builder.addCase(getAuthUser.rejected, (state: AuthState) => {
      state.getUser.loading = false;
      state.getUser.error = true;
    });
  },
});

export const selectAuthUser = (state: RootState) => state.auth.getUser;

export default authSlice.reducer;
