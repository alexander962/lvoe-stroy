export type DailyTip = {
  id: string;
  category: "focus" | "planning" | "rest";
  text: string;
};

export const dailyTips: DailyTip[] = [
  {
    id: "1",
    category: "focus",
    text: "Разбейте крупную задачу на шаги продолжительностью не более 25 минут.",
  },
  {
    id: "2",
    category: "planning",
    text: "Перед началом работы выберите одну главную задачу на текущий день.",
  },
  {
    id: "3",
    category: "rest",
    text: "После нескольких рабочих интервалов сделайте длинный перерыв без экрана.",
  },
];
