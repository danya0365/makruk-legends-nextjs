import { cn } from "@/src/utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "left", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-2",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/90 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description ? (
        <p className="text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
