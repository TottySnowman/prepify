export default function getCurrentWeekNumber(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const elapsedDays = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const currentWeekNumber = Math.ceil((elapsedDays + 1) / 7);

  return currentWeekNumber;
}
