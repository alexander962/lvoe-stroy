import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link href="/">На главную</Link>
    </div>
  );
}
