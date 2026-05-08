type LogoSize = "sm" | "md" | "lg" | "xl";
type LogoVariant = "dark" | "light";
type ResponsiveSize = { base: LogoSize; md?: LogoSize; lg?: LogoSize };

const baseClass: Record<LogoSize, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

const mdClass: Record<LogoSize, string> = {
  sm: "md:text-2xl",
  md: "md:text-4xl",
  lg: "md:text-6xl",
  xl: "md:text-8xl",
};

const lgClass: Record<LogoSize, string> = {
  sm: "lg:text-2xl",
  md: "lg:text-4xl",
  lg: "lg:text-6xl",
  xl: "lg:text-8xl",
};

function resolveSizeClasses(size: LogoSize | ResponsiveSize): string {
  if (typeof size === "string") return baseClass[size];
  const parts = [baseClass[size.base]];
  if (size.md) parts.push(mdClass[size.md]);
  if (size.lg) parts.push(lgClass[size.lg]);
  return parts.join(" ");
}

export default function Logo({
  size = "md",
  variant = "dark",
}: {
  size?: LogoSize | ResponsiveSize;
  variant?: LogoVariant;
}) {
  const fndryColor = variant === "dark" ? "text-steel-100" : "text-steel-800";
  const xColor = variant === "dark" ? "text-fire-400" : "text-fire-500";
  const sizeClasses = resolveSizeClasses(size);

  return (
    <span
      className={`inline-flex items-baseline leading-none ${sizeClasses}`}
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
