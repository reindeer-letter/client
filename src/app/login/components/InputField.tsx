import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

function InputField({ type, placeholder, register, error }: InputFieldProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`h-12 w-full rounded-lg border px-4 placeholder-grey-600 focus:border-white focus:bg-grey-800 focus:outline-none ${
          error
            ? "border-red-500 bg-transparent text-red-500"
            : "border-gray-400 bg-transparent text-white"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default InputField;
