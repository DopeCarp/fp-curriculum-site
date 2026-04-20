import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-serif text-3xl tracking-tight md:text-[2.75rem] md:leading-[1.05]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-[1.02rem]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
