"use client";

import { useDeleteTaskMutation } from "@/entities/task";

type DeleteTaskButtonProps = {
  taskId: string;
  taskTitle: string;
};

export function DeleteTaskButton({ taskId, taskTitle }: DeleteTaskButtonProps) {
  const [deleteTask, { isLoading, isError }] = useDeleteTaskMutation();

  const handleDeleteTask = async () => {
    const confirmed = window.confirm(`Удалить задачу ${taskTitle}?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(taskId).unwrap();
    } catch {}
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleDeleteTask}
        disabled={isLoading}
        aria-label={`Удалить задачу ${taskTitle}`}
      >
        {isLoading ? "Удаляем..." : "Удалить"}
      </button>

      {isError && <div role="alert">Не удалось удалить задачу</div>}
    </div>
  );
}
