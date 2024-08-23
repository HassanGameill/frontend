import { configureStore, combineReducers } from '@reduxjs/toolkit';
import
  { persistStore, 
    persistReducer, 
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import categories from './categories/categoriesSlice.ts';
import products from './products/productsSlice.ts';
import cart from './cart/cartSlice.ts';
import wishlist from './wishlistLike/wishlistSlice.ts';
import Auth from './Auth/AuthSlice.ts';
import orders from './orders/ordersSlice.ts';


const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "Auth"],
};

const authPersistConfig = {
  key: "Auth",
  storage,
  whiteList: ["user", "accessToken"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  Auth: persistReducer(authPersistConfig, Auth),
  categories,
  products,
  orders,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: wishlist,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
