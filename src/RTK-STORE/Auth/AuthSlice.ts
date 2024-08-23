import {createSlice, createSelector} from "@reduxjs/toolkit"

import {TProducts} from "../../Types/products"
import actAuthRegister  from "./act/actAuthRegister.ts"
import actAuthLogin  from "./act/actAuthLogin.ts"

import {RootState} from "../store"
import {TLoading} from "../../Types/Shared"
import isString from "../../Types/guards"



interface IAuthState {
  user: {
    id: number;
    email: string;
    first: string;
    last: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
}



const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    resetUi: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      state.accessToken = null;
    }
  },
  
  extraReducers: (builder) => {
    // ==== Register ..... ====
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    
    // === Login ..... =====
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    
  },
  
})


export {actAuthRegister, actAuthLogin};
export const {resetUi, authLogout} = AuthSlice.actions
export default AuthSlice.reducer;

