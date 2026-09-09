import Link from "next/link";

export default function Tasks() {
  return (
    <div>
      <h1>Задачи</h1>
      <p>Тут будут задачи</p>
      <ul>
        <li>
          <Link href={`/tasks/1`}>Задача 1</Link>
        </li>
        <li>
          <Link href={`/tasks/2`}>Задача 2</Link>
        </li>
      </ul>
    </div>
  );
}
