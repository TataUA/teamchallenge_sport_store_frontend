import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import { authReducer } from "./auth/authSlice";
import { generalFiltersReducer } from "./generalFilters/generalFiltersSlice";
import { currentProductReducer } from "./currentProduct/currentProductSlice";
import { cartReducer } from "./cart/cartSlice";
import { searchReducer } from "./search/searchSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken"],
};
const searchPersistConfig = {
  key: "search",
  storage,
  whitelist: ["previousQueries"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(authPersistConfig, authReducer),
    generalFilters: generalFiltersReducer,
    currentProduct: currentProductReducer,
    cart: cartReducer,
    search: persistReducer<ReturnType<typeof searchReducer>>(searchPersistConfig, searchReducer),
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
