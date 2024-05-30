import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import authReducer from "./slices/authSlice";
import taskSlices from "./slices/taskSlices";


// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth","tasks"],
};

const rootReducer = combineReducers({
  auth:authReducer,
  tasks:taskSlices,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
