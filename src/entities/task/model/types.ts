export type TaskStatus = "planned" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type CreateTaskInput = Omit<Task, "id" | "createdAt">;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}
