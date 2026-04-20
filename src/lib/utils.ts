import { LanguageMode } from "@/types/curriculum";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function formatText(zh: string, en: string, language: LanguageMode) {
  if (language === "zh") return zh;
  if (language === "en") return en;
  return `${zh} / ${en}`;
}

export function titleForCourse(
  course: { title_zh: string; title_en: string },
  language: LanguageMode,
) {
  return formatText(course.title_zh, course.title_en, language);
}

export function textForObjective(
  course: { objective_zh: string; objective_en: string },
  language: LanguageMode,
) {
  return formatText(course.objective_zh, course.objective_en, language);
}

export function uiLabel(
  language: LanguageMode,
  zh: string,
  en: string,
  bothDivider = " / ",
) {
  if (language === "zh") return zh;
  if (language === "en") return en;
  return `${zh}${bothDivider}${en}`;
}

export function toNumberList(value: number | number[]) {
  return Array.isArray(value) ? value : [value];
}

export function hasNumericValue(value: number | number[], target: number) {
  return toNumberList(value).includes(target);
}

export function firstNumericValue(value: number | number[]) {
  return toNumberList(value)[0];
}

export function formatNumericSpan(
  value: number | number[],
  language: LanguageMode,
  singleZhPrefix: string,
  singleEnPrefix: string,
) {
  const values = toNumberList(value);

  if (values.length === 1) {
    return uiLabel(language, `${singleZhPrefix} ${values[0]}`, `${singleEnPrefix} ${values[0]}`);
  }

  return uiLabel(
    language,
    `${singleZhPrefix} ${values.join("、")}`,
    `${singleEnPrefix} ${values.join(", ")}`,
  );
}
