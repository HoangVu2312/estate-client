import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./service/appApi";

// persist 
import storage from "redux-persist/lib/storage";  
// import { persistReducer, persistStore } from "redux-persist";
import propertySlice from "./features/propertySlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
// Create main reducer
const reducer = combineReducers({
  user: userSlice,
  properties: propertySlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath, "properties"]
};

// Persist store
const persistedReducer = persistReducer(persistConfig, reducer);

// Create main-persisted store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(appApi.middleware),
});

export const persistor = persistStore(store);
export default store;
