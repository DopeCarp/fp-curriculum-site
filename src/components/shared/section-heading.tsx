"use client";

import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--line)] pb-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3">
          <h1 className="max-w-4xl font-serif text-3xl tracking-tight md:text-[2.75rem] md:leading-[1.05]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-[1.02rem]">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="flex items-end justify-between gap-4 md:min-w-[14rem] md:justify-end">{action}</div> : null}
      </div>
    </div>
  );
}
