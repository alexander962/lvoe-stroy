import { tasks } from "@/entities/task";
import { TasksView } from "@/views/tasks";

export default function Tasks() {
  return <TasksView tasks={tasks} />;
}
