import {createSlice, createSelector} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {TLoading} from "../../Types/Shared"
import isString from "../../Types/guards"
import {TProducts} from "../../Types/products"
import {TOrderItem} from "../../Types/orderType.ts"
import actPlaceOrder from "./act/actPlaceOrder.ts"
import actGetOrders from "./act/actGetOrders.ts"


interface IOrderState  {
  orderList: TOrderItem[];
  loading: TLoading;
  error: string | null;
}

const initialState = {
  orderList: [],
  loading: "idle",
  error: null,
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    // place order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    
    // Get Orders ....
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    
  }
  
});


export {actPlaceOrder, actGetOrders}; 

export const {resetOrderStatus} = ordersSlice.actions;

export default ordersSlice.reducer;