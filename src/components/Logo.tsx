type LogoSize = "sm" | "md" | "lg" | "xl";
type LogoVariant = "dark" | "light";

const sizeClass: Record<LogoSize, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

export default function Logo({
  size = "md",
  variant = "dark",
}: {
  size?: LogoSize;
  variant?: LogoVariant;
}) {
  const fndryColor = variant === "dark" ? "text-steel-100" : "text-steel-800";
  const xColor = variant === "dark" ? "text-fire-400" : "text-fire-500";

  return (
    <span
      className={`inline-flex items-baseline leading-none ${sizeClass[size]}`}
    >
      <span
        className={`font-display font-extrabold ${fndryColor}`}
        style={{ letterSpacing: "-0.03em" }}
      >
        FNDRY
      </span>
      <span
        className={`font-serif italic font-normal ${xColor}`}
        style={{
          marginLeft: "-0.05em",
          position: "relative",
          top: "0.05em",
        }}
      >
        x
      </span>
    </span>
  );
}
