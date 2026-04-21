"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { uiLabel } from "@/lib/utils";

export function LandingPage() {
  const { language } = useLanguage();

  return (
    <div className="flex min-h-[calc(100vh-5.5rem)] items-center justify-center bg-white px-6 py-16">
      <div className="text-center">
        <h1 className="font-serif text-5xl tracking-tight text-[var(--foreground)] md:text-7xl">
          {uiLabel(language, "F+P 学组", "F+P Group")}
        </h1>
      </div>
    </div>
  );
}
