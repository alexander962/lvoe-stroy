import { render, screen } from "@testing-library/react";
import { TaskCard } from "./task-card";
import type { Task } from "../model/types";

describe("TaskCard", () => {
  const task: Task = {
    id: "1",
    title: "Task 1",
    description: "Description 1",
    status: "planned",
    priority: "medium",
    createdAt: "2026-10-15",
  };

  it("показывает данные задачи и ссылку на детальную страницу", () => {
    render(<TaskCard task={task} />);

    const titleLink = screen.getByRole("link", { name: task.title });

    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", `/tasks/${task.id}`);

    expect(screen.getByText(task.description)).toBeInTheDocument();
    expect(screen.getByText(task.status)).toBeInTheDocument();
    expect(screen.getByText(task.priority)).toBeInTheDocument();
    expect(screen.getByText(task.createdAt)).toBeInTheDocument();
  });

  it("Показывает переданное действие", () => {
    render(<TaskCard task={task} actions={<button>Удалить</button>} />);

    const titleLink = screen.getByRole("link", { name: task.title });

    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", `/tasks/${task.id}`);

    expect(screen.getByText(task.description)).toBeInTheDocument();
    expect(screen.getByText(task.status)).toBeInTheDocument();
    expect(screen.getByText(task.priority)).toBeInTheDocument();
    expect(screen.getByText(task.createdAt)).toBeInTheDocument();
  });
});
