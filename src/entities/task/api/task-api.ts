import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task, CreateTaskInput } from "../model/types";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["Task"],

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),

  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: [{ type: "Task", id: "List" }],
    }),

    addTask: builder.mutation<Task, CreateTaskInput>({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "List" }],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = taskApi;
