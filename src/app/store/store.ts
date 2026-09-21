import { configureStore } from "@reduxjs/toolkit";

type EmptyState = Record<string, unknown>;

const emptyReducer = (state: EmptyState = {}): EmptyState => {
  return state;
};

export const makeStore = () => {
  return configureStore({
    reducer: emptyReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
