export default function formateISODateToYYYYMMDD(date: string) {
  const YYYY_MM_DD = date.split("T")[0];
  const [year, month, day] = YYYY_MM_DD.split("-");
  return `${year}년 ${month}월 ${day}일`;
}

export function formateISODateToYYYYMMDDHHMM(date: string) {
  const YYYY_MM_DD = date.split("T")[0];
  const HH = date.split("T")[1].split(":")[0];
  const MM = date.split("T")[1].split(":")[1];
  const [year, month, day] = YYYY_MM_DD.split("-");
  return `${year}. ${month}. ${day}. ${HH}:${MM}`;
}
