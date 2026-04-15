import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  color?: "teal" | "amber" | "purple";
  size?: "sm" | "md" | "lg";
}

export function GradientOrb({
  className,
  color = "teal",
  size = "md",
}: GradientOrbProps) {
  const colors = {
    teal: "bg-[radial-gradient(circle,rgba(13,107,110,0.25),transparent_70%)]",
    amber: "bg-[radial-gradient(circle,rgba(245,158,11,0.2),transparent_70%)]",
    purple: "bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_70%)]",
  };

  const sizes = {
    sm: "w-[300px] h-[300px]",
    md: "w-[500px] h-[500px]",
    lg: "w-[700px] h-[700px]",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        colors[color],
        sizes[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
