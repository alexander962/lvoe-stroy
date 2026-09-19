import type { Task } from "@/entities/task";
import { TaskFilter } from "@/features/filter-tasks";

type TaskBoardProps = {
  tasks: Task[];
};

export function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <section>
      <header>
        <h1>Задачи</h1>
        <p>{tasks.length} задач всего</p>
      </header>

      <TaskFilter tasks={tasks} />
    </section>
  );
}
