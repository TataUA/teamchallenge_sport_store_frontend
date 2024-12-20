import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import { authReducer } from "./auth/authSlice";
import { cartReducer } from "./cart/cartSlice";
import { currentProductReducer } from "./currentProduct/currentProductSlice";
import { generalFiltersReducer } from "./generalFilters/generalFiltersSlice";
import { searchReducer } from "./search/searchSlice";
import { orderReducer } from "./order/orderSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["products"],
};
const searchPersistConfig = {
  key: "search",
  storage,
  whitelist: ["previousQueries"],
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    generalFilters: generalFiltersReducer,
    order: orderReducer,
    currentProduct: currentProductReducer,
    cart: persistReducer<ReturnType<typeof cartReducer>>(
      cartPersistConfig,
      cartReducer
    ),
    search: persistReducer<ReturnType<typeof searchReducer>>(
      searchPersistConfig,
      searchReducer
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
