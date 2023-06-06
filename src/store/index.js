import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
        user:UserSlice
    },
    preloadedState,
  });
};