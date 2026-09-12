import Link from "next/link";
import styles from "./page.module.scss";

export const dynamic = "force-static";

export default function Home() {
  const generatedAt = new Date().toISOString();
  return (
    <div className={styles.page}>
      <h1>Focus Board</h1>
      <p>
        Focus Board — лёгкий менеджер задач для тех, кто ценит ясность.
        Добавляйте задачи, отслеживайте прогресс и работайте продуктивно без
        лишней суеты.
      </p>
      <p>
        Страница собрана: <time dateTime={generatedAt}>{generatedAt}</time>
      </p>
      <Link href="/tasks">Задачи</Link>
    </div>
  );
}
