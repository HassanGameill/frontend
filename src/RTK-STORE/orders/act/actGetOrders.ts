import {createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";
import {TProducts} from "../../../Types/products"
import {axiosErrorHandler} from "../../../Utilities/index"
import {RootState} from "../../store"; 
import {TOrderItem} from "../../../Types/orderType.ts"

type TResponse = TOrderItem[]


const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
    async (_, thunkAPI) => {
      const {rejectWithValue, getState, signal} = thunkAPI;
      const {Auth} = getState() as RootState;
      
      try {
        const res = await axios.get<TResponse>(`/orders?userId=${Auth.user?.id}`, {signal})
        
        return res.data;
      }
      catch (error) {
        return rejectWithValue(axiosErrorHandler(error)) 
      }
      
    }
);



export default actGetOrders;