import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  main: appReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
