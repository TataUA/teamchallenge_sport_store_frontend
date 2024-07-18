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

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(authPersistConfig, authReducer),
    generalFilters: generalFiltersReducer,
    currentProduct: currentProductReducer,
    cart: cartReducer,
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
