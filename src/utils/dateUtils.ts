/**
 * 날짜 포맷 함수
 * @param date Date 객체
 * @returns "YYYY년 MM월 DD일" 형식 문자열
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

/**
 * 날짜 차이 계산 함수
 * @param selectedDate "YYYY년 MM월 DD일" 형식 문자열
 * @returns 선택 날짜와 오늘의 일 수 차이
 */
export const calculateDaysDifference = (
  selectedDate: string,
): number | null => {
  if (!selectedDate) return null;

  const [year, month, day] = selectedDate
    .replace(/년|월|일/g, "")
    .trim()
    .split(" ")
    .map(Number);

  const today = new Date();
  const selected = new Date(year, month - 1, day);

  const diffInMs = selected.getTime() - today.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};
