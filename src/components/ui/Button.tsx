import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 font-medium transition ${variants[variant]}`}
    >
      {children}
    </button>
  );
}