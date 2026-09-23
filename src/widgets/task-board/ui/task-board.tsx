"use client";

import { TaskFilter } from "@/features/filter-tasks";
import { useGetTasksQuery } from "@/entities/task";

export function TaskBoard() {
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery();

  if (isLoading) return <section>Загружаем задачи...</section>;

  if (isError)
    return <section role="alert">Не удалось загрузить задачи</section>;

  return (
    <section>
      <header>
        <h1>Задачи</h1>
        <p>{tasks.length} задач всего</p>
      </header>

      <TaskFilter tasks={tasks} />
    </section>
  );
}
