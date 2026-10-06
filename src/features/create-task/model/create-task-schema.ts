import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Введите минимум 3 символа")
    .max(80, "Введите не больше 80 символов"),
  description: z
    .string()
    .trim()
    .min(10, "Введите минимум 10 символов")
    .max(300, "Введите не больше 300 символов"),
  status: z.enum(["planned", "in-progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});
