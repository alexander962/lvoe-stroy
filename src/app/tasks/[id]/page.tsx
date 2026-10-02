import Link from "next/link";
import { notFound } from "next/navigation";
import type { Task } from "@/entities/task";

export default async function Task({ params }: PageProps<"/tasks/[id]">) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:4000/tasks/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(
      `Не удалось загрузить данные по задаче: HTTP ${response.status}`,
    );
  }

  const task: Task = await response.json();

  return (
    <div>
      <Link href="/tasks">Назад к задачам</Link>
      <h1>{task.title}</h1>
      <div>
        <p>{task.status}</p>
        <p>{task.priority}</p>
      </div>
      <p>{task.description}</p>
      <hr />
      <div>
        <div>
          <span>Статус</span>
          <p>{task.status}</p>
        </div>
        <div>
          <span>Приоритет</span>
          <p>{task.priority}</p>
        </div>
        <div>
          <span>Номер задачи</span>
          <p>{task.id}</p>
        </div>
        <div>
          <span>Дата создания</span>
          <p>{task.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
