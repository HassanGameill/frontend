import {createSlice} from "@reduxjs/toolkit"
import actGetCategories from "./thunk-act/actGetCategories"
import {TLoading} from "../../Types/Shared"
import {TCategory} from "../../Types/category"
import isString from "../../Types/guards"





interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}


const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
};


const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    cleanUpProductsRecords: (state) => {
      state.records = [];
    }
  },
  
  
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
})



export {actGetCategories};
export const {cleanUpProductsRecords} = categoriesSlice.actions;
export default categoriesSlice.reducer;