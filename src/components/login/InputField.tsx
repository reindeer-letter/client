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
        className={`h-12 w-full border-b-2 bg-White px-2 text-Title02-M text-primary-200 placeholder-line-200 focus:outline-none focus:ring-1 focus:ring-white ${
          error ? "border-red-500" : "border-line-200"
        }`}
      />
      {error && (
        <span className="mt-1 text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
};
