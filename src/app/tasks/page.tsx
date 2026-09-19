import { tasks } from "./data";
import { TasksView } from "@/views/tasks";

export default function Tasks() {
  return <TasksView tasks={tasks} />;
}
