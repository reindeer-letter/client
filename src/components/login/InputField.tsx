import cn from "@/lib/cn";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  label: string;
}

export const InputField = ({
  type,
  placeholder,
  register,
  error,
  label,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col space-y-0">
      {label && (
        <div className="w-full text-left text-Body02-R text-line-600">
          {label}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={cn(
          "h-12 w-full rounded-lg border px-4 placeholder-grey-600 focus:border-white focus:bg-grey-800 focus:outline-none",
          error
            ? "border-red-500 bg-transparent text-red-500"
            : "border-gray-400 bg-transparent text-white",
        )}
      />
      {error && (
        <span className="mt-1 text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
};
