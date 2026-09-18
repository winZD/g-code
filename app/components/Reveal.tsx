import type { ReactNode } from "react";
import { useReveal } from "~/hooks/useReveal";

type Animation = "fade-in" | "fade-in-up" | "fade-in-up-delay-150" | "fade-in-up-delay-300";

export function Reveal({
  children,
  className = "",
  animation = "fade-in-up",
}: {
  children: ReactNode;
  className?: string;
  animation?: Animation;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? `animate-${animation}` : "opacity-0"}`}
    >
      {children}
    </div>
  );
}
