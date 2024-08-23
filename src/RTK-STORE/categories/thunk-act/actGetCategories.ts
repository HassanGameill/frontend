
import {createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";
import {TCategory} from "../../../Types/category"
import {axiosErrorHandler} from "../../../Utilities/index"

type TResponse = TCategory[];




const actGetCategories = createAsyncThunk(
  'categiries/actGetCategories',
    async (_, thunkAPI) => {
      const {rejecWithValue, signal} = thunkAPI;
      
      try {
        const res = await axios.get<TResponse>(`/category`, {signal});
        console.log(res.data)
        return res.data;
      }
      
      catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
      }
    }
)


export default actGetCategories;
