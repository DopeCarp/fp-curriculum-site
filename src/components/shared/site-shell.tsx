"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { cn, uiLabel } from "@/lib/utils";

const navItems = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/design-philosophy", zh: "设计教育理念", en: "Design Education Philosophy" },
  { href: "/course-matrix", zh: "课程矩阵", en: "Matrix" },
  { href: "/teaching-model", zh: "教学模型", en: "Teaching Model" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:px-10">
          <div className="flex items-center justify-between gap-6">
            <div className="min-w-max space-y-1.5">
              <TopLabel
                language={language}
                zh="上海工程技术大学 设计学院"
                en="School of Design, Shanghai University of Engineering Science"
                classNameZh="text-[1.18rem] font-medium tracking-[0.08em] text-[var(--foreground)]"
                classNameEn="text-[0.95rem] font-medium tracking-[0.01em] text-[var(--foreground)]"
                bothClassName="grid gap-0.5 text-[0.95rem] font-medium text-[var(--foreground)]"
              />
              <TopLabel
                language={language}
                zh="公共与基础学组"
                en="Public & Foundation Group"
                classNameZh="font-serif text-[0.98rem] text-[var(--muted)]"
                classNameEn="font-serif text-[0.98rem] whitespace-nowrap text-[var(--muted)]"
                bothClassName="grid gap-0 font-serif text-[0.98rem] text-[var(--muted)]"
              />
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-full px-3 py-2 text-sm transition-colors",
                        language === "en" ? "whitespace-nowrap" : "",
                        language === "both" ? "min-w-[8.5rem]" : "",
                        active
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]",
                      )}
                    >
                      <TopLabel
                        language={language}
                        zh={item.zh}
                        en={item.en}
                        classNameZh=""
                        classNameEn="whitespace-nowrap"
                        bothClassName="grid gap-0 text-left leading-5"
                      />
                    </Link>
                  );
                })}
              </nav>
              <LanguageToggle />
            </div>
          </div>
          <nav className="scrollbar-none flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-2 text-sm transition-colors",
                    language === "en" ? "whitespace-nowrap" : "",
                    language === "both" ? "min-w-[8.5rem]" : "",
                    active
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--foreground)]",
                  )}
                >
                  <TopLabel
                    language={language}
                    zh={item.zh}
                    en={item.en}
                    classNameZh=""
                    classNameEn="whitespace-nowrap"
                    bothClassName="grid gap-0 text-left leading-5"
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

function TopLabel({
  language,
  zh,
  en,
  classNameZh,
  classNameEn,
  bothClassName,
}: {
  language: ReturnType<typeof useLanguage>["language"];
  zh: string;
  en: string;
  classNameZh?: string;
  classNameEn?: string;
  bothClassName?: string;
}) {
  if (language === "zh") {
    return <span className={classNameZh}>{zh}</span>;
  }

  if (language === "en") {
    return <span className={classNameEn}>{en}</span>;
  }

  return (
    <span className={bothClassName}>
      <span className="block">{zh}</span>
      <span className="block">{en}</span>
    </span>
  );
}
