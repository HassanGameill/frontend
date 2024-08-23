import {createSlice, createSelector} from "@reduxjs/toolkit"
import addGetProductsByItems from "./thunk-act/addGetProductsByItems"
import {TProducts} from "../../Types/products"
import {
  getCartTotalQuantitySelector,
} from "./Selectors/Selector";

import {RootState} from "../store"
import {TLoading} from "../../Types/Shared"
import isString from "../../Types/guards"




interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProducts[];
  loading: TLoading,
  error: null | string,
}


const initialState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
  
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    
    cartItemsChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
    
    cleanCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
    
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
    
  },
  
  extraReducers: (builder) => {
    builder.addCase(addGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(addGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(addGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },

});




export {
  getCartTotalQuantitySelector,
  addGetProductsByItems,
};


export const {
  addToCart, 
  cartItemsChangeQuantity, 
  cartItemRemove, 
  cleanCartProductsFullInfo, 
  clearCartAfterPlaceOrder
  
} = cartSlice.actions;

export default cartSlice.reducer;