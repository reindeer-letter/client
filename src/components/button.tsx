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
  const baseStyle =
    "h-[62px] w-[350px] rounded-[60px] px-2 py-2 text-center text-Title01-SB hover:opacity-80 disabled:cursor-not-allowed disabled:bg-grey-400 disabled:text-grey-600 disabled:opacity-100";

  const primaryStyle = "bg-primary-200 text-white";
  const abledStyle =
    "bg-white border-[2px] border-primary-200 text-primary-200  ";
  return (
    <button
      className={`${baseStyle} ${
        buttonType === "Primary" ? primaryStyle : abledStyle
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
