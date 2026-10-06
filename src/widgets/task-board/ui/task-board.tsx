"use client";

import { TaskFilter } from "@/features/filter-tasks";
import { useGetTasksQuery, useAddTaskMutation } from "@/entities/task";
import type { CreateTaskInput } from "@/entities/task";
import { CreateTaskForm } from "@/features/create-task";
import { DeleteTaskButton } from "@/features/delete-task";

export function TaskBoard() {
  const {
    data: tasks = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetTasksQuery();

  const [
    addTask,
    {
      isLoading: isCreating,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
    },
  ] = useAddTaskMutation();

  const handleCreateTask = async (values: CreateTaskInput) => {
    try {
      await addTask(values).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  if (isLoading) return <section>Загружаем задачи...</section>;

  if (isError)
    return <section role="alert">Не удалось загрузить задачи</section>;

  return (
    <section>
      <header>
        <h1>Задачи</h1>
        <p>{tasks.length} задач всего</p>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Обновляем" : "Обновить"}
        </button>
      </header>

      <CreateTaskForm onSubmit={handleCreateTask} />
      {isCreating && <div>Сохраняем задачу...</div>}
      {isCreateSuccess && <div role="status">Задача сохранена на сервере</div>}
      {isCreateError && <div role="alert">Не удалось добавить задачу</div>}

      <TaskFilter
        tasks={tasks}
        renderTaskActions={(task) => (
          <DeleteTaskButton taskId={task.id} taskTitle={task.title} />
        )}
      />
    </section>
  );
}
