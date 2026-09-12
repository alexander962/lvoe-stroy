export type TaskStatus = "planned" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

export const tasks: Task[] = [
  {
    id: "1",
    title: "Аудит дизайн-системы",
    description:
      "Проверить UI-компоненты на единообразие отступов, типографики, цветов и состояний взаимодействия.",
    status: "done",
    priority: "high",
    createdAt: "2026-09-01T09:00:00.000Z",
  },
  {
    id: "2",
    title: "Спланировать дорожную карту на Q4",
    description:
      "Собрать список новых функций и технического долга на следующий квартал.",
    status: "planned",
    priority: "medium",
    createdAt: "2026-09-03T12:30:00.000Z",
  },
  {
    id: "3",
    title: "Настроить CI/CD pipeline",
    description:
      "Подготовить автоматические проверки для тестирования и деплоя проекта.",
    status: "in-progress",
    priority: "high",
    createdAt: "2026-09-05T15:45:00.000Z",
  },
];
