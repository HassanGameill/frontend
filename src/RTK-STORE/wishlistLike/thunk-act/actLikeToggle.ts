import {createAsyncThunk} from "@reduxjs/toolkit"; 
import {RootState} from "../../store"; 
import axios from "axios";
import {axiosErrorHandler} from "../../../Utilities/index";


const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const {Auth} = getState() as RootState;
    
    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=${Auth.user?.id}&productId=${id}`
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", { userId: Auth.user?.id, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);



export default actLikeToggle;