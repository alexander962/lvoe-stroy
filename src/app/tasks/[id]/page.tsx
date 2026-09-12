import Link from "next/link";
import { tasks } from "@/app/tasks/data";
import { notFound } from "next/navigation";

export default async function Task({ params }: PageProps<"/tasks/[id]">) {
  const { id } = await params;
  const task = tasks.find((task) => task?.id === id);

  if (!task) {
    notFound();
  }

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
