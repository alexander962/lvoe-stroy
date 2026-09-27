import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task, CreateTaskInput } from "../model/types";

export const taskApi = createApi({
  reducerPath: "taskApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),

  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
    }),

    addTask: builder.mutation<Task, CreateTaskInput>({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = taskApi;
