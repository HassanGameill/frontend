import {createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";
import {TProducts} from "../../../Types/products"
import {RootState} from "../../store"; 
import {axiosErrorHandler} from "../../../Utilities/index"


type TDataType = "ProductsFullInfo" | "ProductsIds" ;

type TResponse = TProducts[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    
    const {Auth} = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${Auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return {data: [], dataType: "empty"};
      }
      
      
      if (dataType === "ProductsIds") {
        const concatenatedItemsId = userWishlist.data
        .map((el) => el.productId);
        
        return {data: concatenatedItemsId, dataType: "ProductsIds"};
  
        
      } else {
        const concatenatedItemsId = userWishlist.data
        .map((el) => `id=${el.productId}`)
        .join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return {data: response.data, dataType: "ProductsFullInfo"};
        
      }
      
    } 
    
    
    catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;