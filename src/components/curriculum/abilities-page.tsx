"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { CourseDetailDrawer } from "@/components/shared/course-detail-drawer";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn, formatText, titleForCourse, uiLabel } from "@/lib/utils";
import { Course, CurriculumData } from "@/types/curriculum";

export function AbilitiesPage({
  courses,
  curriculum,
}: {
  courses: Course[];
  curriculum: CurriculumData;
}) {
  const { language } = useLanguage();
  const [activeAbility, setActiveAbility] = useState<string>(
    curriculum.abilities[0]?.name_en ?? "",
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const relatedCourses = courses.filter((course) =>
    course.abilities.includes(activeAbility),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const requestedAbility = new URLSearchParams(window.location.search).get("ability");
    if (
      requestedAbility &&
      curriculum.abilities.some((ability) => ability.name_en === requestedAbility)
    ) {
      setActiveAbility(requestedAbility);
    }
  }, [curriculum.abilities]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        eyebrow={uiLabel(language, "能力体系", "Abilities")}
        title={uiLabel(language, "能力", "Abilities")}
      />

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {curriculum.abilities.map((ability, index) => {
            const active = activeAbility === ability.name_en;
            return (
              <button
                key={ability.name_en}
                type="button"
                onClick={() => setActiveAbility(ability.name_en)}
                className={cn(
                  "relative overflow-hidden rounded-[1.5rem] border p-5 text-left transition-colors",
                  active
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--line)] bg-white hover:bg-[var(--card)]",
                )}
              >
                <div
                  className={cn(
                    "absolute left-0 top-0 h-full w-1 transition-colors",
                    active ? "bg-[var(--accent)]" : "bg-transparent",
                  )}
                />
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  {uiLabel(language, `能力 0${index + 1}`, `Ability 0${index + 1}`)}
                </p>
                <p className="font-serif text-2xl">
                  {formatText(ability.name_zh, ability.name_en, language)}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {uiLabel(language, "查看支撑课程", "View supporting courses")}
                </p>
              </button>
            );
          })}
        </div>

        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 lg:p-8">
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              {uiLabel(language, "能力说明", "Ability Overview")}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              {uiLabel(language, "点击课程查看详情", "Open course details")}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--accent)] bg-[linear-gradient(180deg,#ffffff_0%,#f3f7ff_100%)] p-6">
            <p className="text-lg leading-8 font-medium text-[var(--foreground)] md:text-[1.18rem] md:leading-[1.75]">
              {formatText(
                curriculum.abilities.find((entry) => entry.name_en === activeAbility)?.description_zh ?? "",
                curriculum.abilities.find((entry) => entry.name_en === activeAbility)?.description_en ?? "",
                language,
              )}
            </p>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            {uiLabel(language, "支撑课程", "Supporting Courses")}
          </p>
          <div className="mt-6 grid gap-3">
            {relatedCourses.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => setSelectedCourse(course)}
                className="rounded-[1.25rem] border border-[var(--line)] bg-white p-5 text-left transition-colors hover:bg-[var(--accent-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{titleForCourse(course, language)}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {uiLabel(
                        language,
                        course.course_type === "Studio"
                          ? "工作室"
                          : course.course_type === "Foundational Studio"
                            ? "基础工作室"
                          : course.course_type === "Seminar or Lecture"
                            ? "研讨 / 讲授"
                            : "专业发展",
                        course.course_type,
                      )}
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs">
                    {uiLabel(language, `${course.credits} 学分`, `${course.credits} cr`)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CourseDetailDrawer
        course={selectedCourse}
        courses={courses}
        curriculum={curriculum}
        open={Boolean(selectedCourse)}
        onClose={() => setSelectedCourse(null)}
        onSelectCourse={setSelectedCourse}
      />
    </div>
  );
}
