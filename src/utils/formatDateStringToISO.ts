export function formatDateStringToISO(dateString: string): string {
  const [year, month, day] = dateString
    .replace(/년|월|일/g, "")
    .trim()
    .split(" ")
    .map(Number);

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
