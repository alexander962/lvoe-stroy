"use client";

import { type ReactNode, useState } from "react";
import { TaskCard, type Task } from "@/entities/task";

type TaskFilterProps = {
  tasks: Task[];
  renderTaskActions?: (task: Task) => ReactNode;
};

type TaskFilterValue = Task["status"] | "all";

export function TaskFilter({ tasks, renderTaskActions }: TaskFilterProps) {
  const [activeFilter, setActiveFilter] = useState<TaskFilterValue>("all");

  const visibleTasks =
    activeFilter === "all"
      ? tasks
      : tasks.filter((item) => item.status === activeFilter);

  return (
    <div>
      <div>
        <button
          aria-pressed={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        >
          Все {tasks.length}
        </button>

        <button
          onClick={() => setActiveFilter("planned")}
          aria-pressed={activeFilter === "planned"}
        >
          Запланировано{" "}
          {tasks.filter((item) => item.status === "planned").length}
        </button>

        <button
          onClick={() => setActiveFilter("in-progress")}
          aria-pressed={activeFilter === "in-progress"}
        >
          В работе{" "}
          {tasks.filter((item) => item.status === "in-progress").length}
        </button>

        <button
          onClick={() => setActiveFilter("done")}
          aria-pressed={activeFilter === "done"}
        >
          Выполнено {tasks.filter((item) => item.status === "done").length}
        </button>
      </div>
      {visibleTasks.length === 0 ? (
        <div>Задачи по данному фильтру отсутствуют</div>
      ) : (
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} actions={renderTaskActions?.(task)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
