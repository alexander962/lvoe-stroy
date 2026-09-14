import { tasks } from "./data";
import TaskFilter from "@/app/tasks/task-filter";

export default function Tasks() {
  return (
    <div>
      <h1>Задачи</h1>
      <p>{tasks.length} задач всего</p>
      <TaskFilter tasks={tasks} />
    </div>
  );
}
