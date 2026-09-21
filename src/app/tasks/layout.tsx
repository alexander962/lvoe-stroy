import { StoreProvider } from "@/app/providers";

export default function TasksLayout({ children }: LayoutProps<"/tasks">) {
  return <StoreProvider>{children}</StoreProvider>;
}
