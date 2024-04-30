import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from "./appReducer";

const rootReducer = combineReducers({
  main: reducer,
});

const store = configureStore({
  reducer: {
    appState: rootReducer,
  },
});

export default store;
