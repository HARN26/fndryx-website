import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-lg font-body font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(135deg,#ea580c_0%,#f97316_100%)] shadow-[0_4px_14px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.5)]",
  secondary: "bg-steel-700 text-steel-100 hover:bg-steel-600",
  outline:
    "bg-transparent border-2 border-fire-400 text-fire-400 hover:bg-fire-400/10",
  ghost: "bg-transparent text-steel-400 hover:text-steel-100",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const padding = className.match(/(?:^|\s)(p[xy]?-)/) ? "" : "px-7 py-3.5";
  return (
    <button
      className={`${base} ${variants[variant]} ${padding} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
