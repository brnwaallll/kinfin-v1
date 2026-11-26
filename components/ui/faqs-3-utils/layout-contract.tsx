import * as React from "react";

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  spacingMode?: "section" | "compact";
}

export const SectionShell = React.forwardRef<HTMLElement, SectionShellProps>(
  ({ spacingMode = "section", className = "", children, ...props }, ref) => {
    const spacingClass =
      spacingMode === "compact" ? "py-14 sm:py-16" : "py-20 sm:py-28";

    return (
      <section
        ref={ref}
        className={`w-full border-b border-black/10 px-6 sm:px-10 ${spacingClass} ${className}`.trim()}
        {...props}
      >
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </section>
    );
  },
);

SectionShell.displayName = "SectionShell";