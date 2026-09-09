import Link from "next/link";

export default async function Task({ params }: PageProps<"/tasks/[id]">) {
  const { id } = await params;
  return (
    <div>
      <h1>Задача</h1>
      <p>Тут будет описание задачи</p>
      <p>Тут будет статус задачи</p>
      <p>Тут будет приоритет</p>
      <p>Задача норме {id}</p>
      <Link href="/tasks">Назад к задачам</Link>
    </div>
  );
}
