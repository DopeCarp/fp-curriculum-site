"use client";

import { useMemo } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { DetailDrawer } from "@/components/shared/detail-drawer";
import {
  firstNumericValue,
  formatNumericSpan,
  formatText,
  textForObjective,
  titleForCourse,
  uiLabel,
} from "@/lib/utils";
import { Course, CurriculumData } from "@/types/curriculum";

export function CourseDetailDrawer({
  course,
  courses,
  curriculum,
  open,
  onClose,
  onSelectCourse,
}: {
  course: Course | null;
  courses: Course[];
  curriculum: CurriculumData;
  open: boolean;
  onClose: () => void;
  onSelectCourse?: (course: Course) => void;
}) {
  const { language } = useLanguage();

  const relatedCourses = useMemo(() => {
    if (!course) return [];

    return courses
      .filter((item) => item.id !== course.id)
      .filter((item) => {
        const sharedDomains = item.domains.some((domain) => course.domains.includes(domain));
        const sharedAbilities = item.abilities.some((ability) =>
          course.abilities.includes(ability),
        );
        return sharedDomains || sharedAbilities;
      })
      .sort(
        (a, b) =>
          firstNumericValue(a.semester) - firstNumericValue(b.semester) ||
          firstNumericValue(a.unit) - firstNumericValue(b.unit),
      )
      .slice(0, 4);
  }, [course, courses]);

  return (
    <DetailDrawer
      open={open}
      title={course ? titleForCourse(course, language) : ""}
      subtitle={
        course
          ? uiLabel(
              language,
              course.category === "Foundation" ? "基础课程" : "公共课程",
              course.category === "Foundation" ? "Foundation Course" : "Public Course",
            )
          : undefined
      }
      closeLabel={uiLabel(language, "关闭", "Close")}
      onClose={onClose}
    >
      {course ? (
        <div className="grid gap-6 text-sm leading-7 text-[var(--muted)]">
          <div className="grid grid-cols-2 gap-3">
            <InfoCell
              label={uiLabel(language, "课程类型", "Course Type")}
              value={translateCourseType(course.course_type, language)}
            />
            <InfoCell
              label={uiLabel(language, "学分", "Credits")}
              value={uiLabel(language, `${course.credits} 学分`, `${course.credits} cr`)}
            />
            <InfoCell
              label={uiLabel(language, "学期", "Semester")}
              value={formatNumericSpan(course.semester, language, "学期", "Semester")}
            />
            <InfoCell
              label={uiLabel(language, "单元", "Unit")}
              value={formatNumericSpan(course.unit, language, "单元", "Unit")}
            />
            <InfoCell
              label={uiLabel(language, "层级", "Layer")}
              value={translateLayer(course.layer, language)}
            />
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              {uiLabel(language, "课程目标", "Objective")}
            </p>
            <p>{textForObjective(course, language)}</p>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              {uiLabel(language, "基础领域", "Domains")}
            </p>
            <div className="flex flex-wrap gap-2">
              {course.domains.map((domain) => (
                <span key={domain} className="rounded-full border border-[var(--line)] px-3 py-1">
                  {translateDomain(domain, curriculum, language)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              {uiLabel(language, "能力关联", "Abilities")}
            </p>
            <div className="flex flex-wrap gap-2">
              {course.abilities.map((ability) => (
                <span key={ability} className="rounded-full border border-[var(--line)] px-3 py-1">
                  {translateAbility(ability, curriculum, language)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              {uiLabel(language, "相关课程", "Related Courses")}
            </p>
            <div className="grid gap-3">
              {relatedCourses.length ? (
                relatedCourses.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectCourse?.(item)}
                    className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--card)] p-4 text-left transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    <p className="font-medium text-[var(--foreground)]">
                      {titleForCourse(item, language)}
                    </p>
                  </button>
                ))
              ) : (
                <p>{uiLabel(language, "暂无可显示的相关课程。", "No related courses available.")}</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </DetailDrawer>
  );
}

function InfoCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--card)] p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">{value}</p>
    </div>
  );
}

function translateCourseType(
  type: Course["course_type"],
  language: ReturnType<typeof useLanguage>["language"],
) {
  const map: Record<Course["course_type"], { zh: string; en: string }> = {
    Studio: { zh: "工作室", en: "Studio" },
    "Foundational Studio": { zh: "基础工作室", en: "Foundational Studio" },
    "Seminar or Lecture": { zh: "研讨 / 讲授", en: "Seminar or Lecture" },
    "Professional Development": { zh: "职业发展", en: "Professional Development" },
  };

  return uiLabel(language, map[type].zh, map[type].en);
}

function translateDomain(
  domain: string,
  curriculum: CurriculumData,
  language: ReturnType<typeof useLanguage>["language"],
) {
  const item = curriculum.domains.find((entry) => entry.name_en === domain);
  return item ? formatText(item.name_zh, item.name_en, language) : domain;
}

function translateAbility(
  ability: string,
  curriculum: CurriculumData,
  language: ReturnType<typeof useLanguage>["language"],
) {
  const item = curriculum.abilities.find((entry) => entry.name_en === ability);
  return item ? formatText(item.name_zh, item.name_en, language) : ability;
}

function translateLayer(
  layer: string,
  language: ReturnType<typeof useLanguage>["language"],
) {
  const map: Record<string, { zh: string; en: string }> = {
    "Shared Foundation": { zh: "共享基础", en: "Shared Foundation" },
    "Design Realization and Digital Media": {
      zh: "设计实现与数字媒介",
      en: "Design Realization and Digital Media",
    },
    "Interaction and System Collaboration": {
      zh: "交互与系统协作",
      en: "Interaction and System Collaboration",
    },
  };

  const item = map[layer];
  return item ? uiLabel(language, item.zh, item.en) : layer;
}
