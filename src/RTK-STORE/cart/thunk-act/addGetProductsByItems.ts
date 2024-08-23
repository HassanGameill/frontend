
import {createAsyncThunk} from "@reduxjs/toolkit"; 
import {RootState} from "../../store"; 
import axios from "axios";
import {TProducts} from "../../../Types/products"
import {axiosErrorHandler} from "../../../Utilities/index"


type TResponse = TProducts[];

const addGetProductsByItems = createAsyncThunk(
  "cart/addGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`, {signal}
      );
      console.log("R Cart Data",response.data)
      return response.data;
    } 
    catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
);




export default addGetProductsByItems;


