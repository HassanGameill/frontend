import {createAsyncThunk} from "@reduxjs/toolkit"; 
import axios from "axios";
import {TProducts} from "../../../Types/products"
import {axiosErrorHandler} from "../../../Utilities/index"
import {RootState} from "../../store"; 


const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, Auth } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cart.items[el.id],
    }));

    try {
      const res = await axios.post("/orders", {
        userId: Auth.user?.id,
        items: orderItems,
        subtotal,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPlaceOrder;