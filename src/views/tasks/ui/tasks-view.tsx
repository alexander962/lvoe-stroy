import type { Task } from "@/entities/task";
import { TaskBoard } from "@/widgets/task-board";

type TasksViewProps = {
  tasks: Task[];
};

export function TasksView({ tasks }: TasksViewProps) {
  return (
    <div>
      <TaskBoard tasks={tasks} />
    </div>
  );
}
