export const dynamic = "force-dynamic";

export default function ServerTime() {
  const requestedAt = new Date();
  const requestedAtIso = requestedAt.toISOString();
  const formattedTime = requestedAt.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Moscow",
  });

  return (
    <div>
      <h1>Серверное время</h1>
      <p>
        <time dateTime={requestedAtIso}>{formattedTime}</time>
      </p>
      <p>Точное время ответа: {requestedAtIso}</p>
      <p>HTML сформирован на сервере для текущего запроса</p>
      <p>SSR</p>
    </div>
  );
}
