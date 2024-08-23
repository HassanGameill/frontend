import {createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";
import {TProducts} from "../../../Types/products"
import {axiosErrorHandler} from "../../../Utilities/index"



type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


const actAuthRegister = createAsyncThunk(
  "Auth/actAuthRegister",
    async (formData: TFormData, thunk) => {
      const {rejectWithValue} = thunk;
      
      try {
        const res = await axios.post(`/register`, formData);
        
        return res.data
      }
      
      catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
      }
      
    }
)

export default actAuthRegister;