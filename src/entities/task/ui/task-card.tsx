import type { Task } from "../model/types";
import Link from "next/link";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div>
      <Link href={`/tasks/${task.id}`}>{task.title}</Link>
      <p>{task.description}</p>
      <div>
        <span>Статус</span>
        <p>{task.status}</p>
      </div>
      <div>
        <span>Приоритет</span>
        <p>{task.priority}</p>
      </div>
      <div>
        <span>Дата создания</span>
        <p>{task.createdAt}</p>
      </div>
    </div>
  );
}
