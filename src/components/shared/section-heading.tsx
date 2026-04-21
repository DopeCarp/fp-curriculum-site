"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { uiLabel } from "@/lib/utils";

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
  const { language } = useLanguage();

  return (
    <div className="border-b border-[var(--line)] pb-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--accent)]" />
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              {eyebrow}
            </p>
          </div>
          <h1 className="max-w-4xl font-serif text-3xl tracking-tight md:text-[2.75rem] md:leading-[1.05]">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-[1.02rem]">
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex items-end justify-between gap-4 md:min-w-[14rem] md:justify-end">
          <div className="grid gap-1 text-right">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
              {uiLabel(
                language,
                "上海工程技术大学 设计学院",
                "School of Design, Shanghai University of Engineering Science",
              )}
            </p>
            <p className="text-xs tracking-[0.16em] text-[var(--muted)]">
              {uiLabel(language, "公共与基础课程体系", "Public & Foundation Curriculum")}
            </p>
          </div>
          {action}
        </div>
      </div>
    </div>
  );
}
