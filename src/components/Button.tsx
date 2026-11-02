import type { ButtonHTMLAttributes, ReactNode } from "react";

// primary: solid fire-400 button (see btn-primary in globals.css).
// secondary: plain text link style, underlined on hover.
// ghost: quiet text for minimal or cancel actions.
type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "btn-primary text-base",
  secondary: "text-link font-body font-medium",
  ghost:
    "font-body font-medium text-steel-400 hover:text-steel-100 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire-400",
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const padding =
    variant === "primary" && !className.match(/(?:^|\s)(p[xy]?-)/)
      ? "px-6 py-3.5"
      : "";
  return (
    <button
      type={type}
      className={`${variants[variant]} ${padding} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
