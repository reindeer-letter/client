"use client";

import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import Button from "../button";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

const CalendarModal = ({
  isOpen,
  onClose,
  onDateSelect,
  selectedDate: initialSelectedDate,
}: CalendarModalProps) => {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    initialSelectedDate,
  );

  const daysOfWeek = useMemo(
    () => ["일", "월", "화", "수", "목", "금", "토"],
    [],
  );

  const getFormattedDate = useCallback(
    (year: number, month: number, date: number) => {
      // const dayOfWeek = daysOfWeek[new Date(year, month, date).getDay()];
      return `${year}년 ${month + 1}월 ${date}일 `;
    },
    [daysOfWeek],
  );

  useEffect(() => {
    if (isOpen && !selectedDate)
      setSelectedDate(
        getFormattedDate(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        ),
      );
  }, [isOpen, selectedDate, getFormattedDate, today]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const dates = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1,
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else setCurrentMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else setCurrentMonth((prev) => prev + 1);
  };

  const handleDateSelect = (date: number) => {
    const formattedDate = getFormattedDate(currentYear, currentMonth, date);
    setSelectedDate(formattedDate);
  };

  const handleComplete = () => {
    if (selectedDate) onDateSelect(selectedDate);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-White p-6 text-grey-800">
        <div className="mb-9 flex items-center justify-between text-Head text-line-700">
          <span>언제 보낼까요?</span>
          <button onClick={onClose} aria-label="닫기">
            <Image src="/Close_32.png" width={24} height={24} alt="close" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-14">
          <button
            className="text-xl text-grey-800"
            onClick={handlePrevMonth}
            aria-label="이전 달"
          >
            <Image src="/Angle-left.png" width={24} height={24} alt="이전 달" />
          </button>
          <h2 className="flex-shrink-0 text-lg font-semibold">
            {currentYear}.{currentMonth + 1}
          </h2>
          <button
            className="text-xl text-grey-800"
            onClick={handleNextMonth}
            aria-label="다음 달"
          >
            <Image
              src="/Angle-right.png"
              width={24}
              height={24}
              alt="다음 달"
            />
          </button>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="font-semibold text-grey-600">
                {day}
              </div>
            ))}
          </div>
          <hr className="my-2 border-line-100" />
          <div className="grid grid-cols-7 gap-2 text-center">
            {dates.map((date) => {
              const formattedDate = getFormattedDate(
                currentYear,
                currentMonth,
                date,
              );
              const isSelected = selectedDate === formattedDate;
              const isPastDate =
                new Date(currentYear, currentMonth, date) <
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                );

              return (
                <button
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`h-12 w-12 rounded-full ${
                    isSelected
                      ? "bg-primary-200 text-White"
                      : isPastDate
                        ? "text-gray-200"
                        : "hover:bg-primary-700 text-gray-800"
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
          <hr className="mb-0 mt-2 border-line-100" />
        </div>
        <div className="mb-8 mt-3 text-center">
          <p className="mb-4 text-left text-Body01-SB text-grey-900">
            {selectedDate}
          </p>
          <Button buttonType="Primary" onClick={handleComplete}>
            완료
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
