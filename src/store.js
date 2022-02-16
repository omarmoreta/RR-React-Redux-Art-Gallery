import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice";
import { logger } from "./features/middleware";

//Redux store with the data reducer and logger middleware
export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: [logger],
});
