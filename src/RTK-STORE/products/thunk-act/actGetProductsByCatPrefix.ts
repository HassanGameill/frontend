
import {createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";
import {TProducts} from "../../../Types/products"
import {axiosErrorHandler} from "../../../Utilities/index"

type TResponse = TProducts[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`, {
          signal,
        }
      );
      return response.data;
    } 
    
    catch (error) {
     return rejectWithValue(axiosErrorHandler(error))
    }
    
  }
);

export default actGetProductsByCatPrefix;