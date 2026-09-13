import { dailyTips } from "@/app/daily-tip/data";

export const revalidate = 10;

export default function DailyTip() {
  const generatedAt = new Date();
  const generatedAtIso = generatedAt.toISOString();
  const tipIndex = generatedAt.getUTCSeconds() % dailyTips.length;
  const tip = dailyTips[tipIndex];
  return (
    <div>
      <h1>Совет дня</h1>
      <p>{tip.category}</p>
      <p>{tip.text}</p>
      <p>
        <time dateTime={generatedAtIso}>{generatedAtIso}</time>
      </p>
      <p>Обновляется каждые 10 секунд</p>
      <p>ISR</p>
    </div>
  );
}
