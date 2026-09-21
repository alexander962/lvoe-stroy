import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "@/entities/task";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [taskApi.reducerPath]: taskApi.reducer,
    },

    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(taskApi.middleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
