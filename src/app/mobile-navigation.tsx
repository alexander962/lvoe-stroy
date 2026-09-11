"use client";

import { useEffect, useState } from "react";
import styles from "./mobile-navigation.module.scss";
import Link from "next/link";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={styles.mobileNavigation}>
      <button
        type="button"
        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((current) => !current)}
        className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Мобильная навигация"
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>
          Главная
        </Link>
        <Link href="/tasks" onClick={() => setIsOpen(false)}>
          Задачи
        </Link>
        <Link href="/server-time" onClick={() => setIsOpen(false)}>
          Серверное время
        </Link>
        <Link href="/daily-tip" onClick={() => setIsOpen(false)}>
          Совет дня
        </Link>
      </div>
    </div>
  );
}
