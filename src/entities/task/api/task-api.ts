import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task } from "../model/types";

export const taskApi = createApi({
  reducerPath: "taskApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),

  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
