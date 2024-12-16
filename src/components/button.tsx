import cn from "@/lib/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

const BASE_STYLE =
  "h-[62px] w-full rounded-[60px] px-2 py-2 text-center text-Title01-SB hover:opacity-80 disabled:cursor-not-allowed disabled:bg-grey-400 disabled:text-grey-600 disabled:opacity-100";

const PRIMARY_STYLE = "bg-primary-200 text-white";
const ABLED_STYLE = "bg-white border-[2px] border-primary-200 text-primary-200";

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
      className={cn(
        BASE_STYLE,
        buttonType === "Primary" ? PRIMARY_STYLE : ABLED_STYLE,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
