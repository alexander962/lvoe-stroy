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

      async onQueryStarted(newTask, { dispatch, queryFulfilled }) {
        const temporaryTask: Task = {
          ...newTask,
          id: `optimistic-${crypto.randomUUID()}`,
          createdAt: new Date().toISOString(),
        };

        const patchResult = dispatch(
          taskApi.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.push(temporaryTask);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: [{ type: "Task", id: "List" }],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${encodeURIComponent(id)}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Task", id: "List" }],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation } =
  taskApi;
