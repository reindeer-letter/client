import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "Primary" | "abled";
  className?: string;
  children: ReactNode;
}

export default function Button({
  buttonType = "Primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`h-14 w-full rounded-md px-2 py-4 text-center text-Body01-SB hover:opacity-80 disabled:cursor-not-allowed disabled:bg-grey-400 disabled:text-grey-600 disabled:opacity-100 ${
        buttonType === "Primary"
          ? "bg-primary-700 text-white"
          : "bg-grey-900 bg-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
