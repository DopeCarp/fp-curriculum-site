"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";
import { LanguageMode } from "@/types/curriculum";
import { cn } from "@/lib/utils";

const options: Array<{ value: LanguageMode; label: string }> = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "both", label: "双语" },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-[var(--line)] bg-white/90 p-1 text-sm">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLanguage(option.value)}
          className={cn(
            "relative rounded-full px-3 py-1.5 transition-colors",
            language === option.value ? "text-[var(--accent)]" : "text-[var(--muted)]",
          )}
        >
          {language === option.value ? (
            <motion.span
              layoutId="language-pill"
              className="absolute inset-0 rounded-full bg-[var(--accent-soft)]"
              transition={{ duration: 0.2 }}
            />
          ) : null}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
