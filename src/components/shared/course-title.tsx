"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { formatText } from "@/lib/utils";

export function CourseTitle({
  zh,
  en,
  as = "span",
}: {
  zh: string;
  en: string;
  as?: "span" | "div" | "p";
}) {
  const { language } = useLanguage();
  const Component = as;
  return <Component>{formatText(zh, en, language) as ReactNode}</Component>;
}
