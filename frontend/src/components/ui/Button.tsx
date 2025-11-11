import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  className?: string;
}

const sizeVariant = {
  sm: "px-2 py-1 text-xs rounded-xl",
  md: "px-4 py-2 text-sm rounded-md",
  lg: "px-8 py-4 text-lg rounded-lg",
};

const defaultStyling =
  "border flex gap-2 items-center justify-center transition-all duration-200";

export const Button = (props: ButtonProps) => {
  const base =
    props.variant === "primary"
      ? "bg-[var(--primary)] text-white hover:bg-white hover:text-[var(--primary)] hover:border-[var(--primary)]"
      : "bg-[var(--secondary)] text-white hover:bg-white hover:text-[var(--secondary)] hover:border-[var(--secondary)]";

  return (
    <button
      onClick={props.onClick}
      className={`${base} ${sizeVariant[props.size]} ${defaultStyling}`}
    >
      {props.startIcon}
      {props.text}
      {props.endIcon}
    </button>
  );
};
