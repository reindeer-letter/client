import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  register,
  error,
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`h-12 w-full rounded-lg border px-4 placeholder-gray-400 focus:border-white focus:bg-grey-800 focus:outline-none ${
          error
            ? "border-red-500 bg-transparent text-red-500"
            : "border-gray-400 bg-transparent text-white"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;