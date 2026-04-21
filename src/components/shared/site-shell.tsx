"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { cn, uiLabel } from "@/lib/utils";

const navItems = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/abilities", zh: "能力", en: "Abilities" },
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
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                {uiLabel(language, "F+P 学组", "F+P Group")}
              </p>
              <p className="font-serif text-lg">
                {uiLabel(language, "公共与基础课程", "Public & Foundation Courses")}
              </p>
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
                        active
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]",
                      )}
                    >
                      {uiLabel(language, item.zh, item.en)}
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
                    active
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--foreground)]",
                  )}
                >
                  {uiLabel(language, item.zh, item.en)}
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
