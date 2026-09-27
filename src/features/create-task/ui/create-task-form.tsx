"use client";

import type { CreateTaskInput } from "@/entities/task";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "../model/create-task-schema";

type CreateTaskFormProps = {
  onSubmit: (values: CreateTaskInput) => void | Promise<void>;
};

export function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "planned",
    },
  });

  return (
    <section>
      <h2>Добавить задачу</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="task-title">Название *</label>
          <input
            id="task-title"
            {...register("title")}
            aria-describedby={errors.title ? "task-title-error" : undefined}
          />
          {errors.title && (
            <div id="task-title-error" role="alert">
              {errors.title.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="task-description">Описание</label>
          <textarea
            id="task-description"
            {...register("description")}
            aria-describedby={
              errors.description ? "task-description-error" : undefined
            }
          />
          {errors.description && (
            <div id="task-description-error" role="alert">
              {errors.description.message}
            </div>
          )}
        </div>

        <div>
          <div>
            <label htmlFor="task-status">Статус</label>
            <select id="task-status" {...register("status")}>
              <option value="planned">Запланировано</option>
              <option value="done">Выполнено</option>
              <option value="in-progress">В работе</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-priority">Приоритет</label>
            <select id="task-priority" {...register("priority")}>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
              <option value="low">Низкий</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Добавляем..." : "Добавить задачу"}
        </button>
      </form>
    </section>
  );
}
