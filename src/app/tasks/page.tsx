import { tasks } from "./data";
import { TaskBoard } from "@/widgets/task-board";

export default function Tasks() {
  return <TaskBoard tasks={tasks} />;
}
