import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/authSlice";
import { taskApiSlice } from "./features/tasks/taskApiSlice";
import taskReducer from "./features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    [taskApiSlice.reducerPath]: taskApiSlice.reducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // TODO: disable devTools in production
  devTools: true, // Note: disable this in production
});
