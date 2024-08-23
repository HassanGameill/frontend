import {createSlice} from "@reduxjs/toolkit"
import actLikeToggle from "./thunk-act/actLikeToggle.ts"
import actGetWishlist from "./thunk-act/actGetWishlist"

// Get authLogout to Reset Data To Wish list 
import {authLogout} from "../Auth/AuthSlice.ts"

import {TProducts} from "../../Types/products"
import {TLoading} from "../../Types/Shared"
import isString from "../../Types/guards"


interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProducts[];
  error: null | string;
  loading: TLoading;
}

const initialState: IWishlist = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanWishlistProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    
    
    // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      
      if (action.payload.dataType === "ProductsFullInfo") {
        state.productsFullInfo = action.payload.data as TProducts[];
      } else if (action.payload.dataType === "ProductsIds") {
        state.itemsId = action.payload.data as number[];
      }
      
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    
    
    builder.addCase(authLogout, state => {
      state.itemsId = [];
      state.productsFullInfo = [];
    });
  },
});




export { actLikeToggle, actGetWishlist };
export const {cleanWishlistProductsFullInfo} = wishlistSlice.actions;
export default wishlistSlice.reducer;
