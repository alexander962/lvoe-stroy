import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import styles from "./layout.module.scss";
import MobileNavigation from "@/app/mobile-navigation";

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
        <header className={styles.header}>
          <div className={styles.container}>
            <Link href="/" className={styles.brand}>
              <Image src="/logo.svg" width={30} height={30} alt="" />
              Focus Board
            </Link>
            <nav className={styles.navigation}>
              <Link href="/">Главная</Link>
              <Link href="/tasks">Задачи</Link>
              <Link href="/server-time">Серверное время</Link>
              <Link href="/daily-tip">Совет дня</Link>
            </nav>
            <MobileNavigation />
          </div>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <h3 className={styles.footerText}>Focus Board · {year} год</h3>
          </div>
        </footer>
      </body>
    </html>
  );
}
