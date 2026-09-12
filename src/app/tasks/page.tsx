import Link from "next/link";
import { tasks } from "./data";

export default function Tasks() {
  return (
    <div>
      <h1>Задачи</h1>
      <p>{tasks.length} задач всего</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link href={`/tasks/${task.id}`}>{task?.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
