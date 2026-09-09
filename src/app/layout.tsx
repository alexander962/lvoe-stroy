import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focus Board",
  description: "Учебный менеджер задач",
};

const year = new Date().getFullYear();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header>
          <Link href="/">Focus Board</Link>
          <nav>
            <Link href="/">Главная</Link>
            <Link href="/tasks">Задачи</Link>
            <Link href="/server-time">Серверное время</Link>
            <Link href="/daily-tip">Совет дня</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <div>
            <h3>Focus Board</h3>
            <p>{year} год</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
