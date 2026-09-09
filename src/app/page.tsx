import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Focus Board</h1>
      <p>
        Focus Board — лёгкий менеджер задач для тех, кто ценит ясность.
        Добавляйте задачи, отслеживайте прогресс и работайте продуктивно без
        лишней суеты.
      </p>
      <Link href="/tasks">Задачи</Link>
    </div>
  );
}
