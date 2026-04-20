"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatText, titleForCourse, uiLabel } from "@/lib/utils";
import { Course, CurriculumData } from "@/types/curriculum";
import { cn } from "@/lib/utils";

export function LogicPage({
  courses,
  curriculum,
}: {
  courses: Course[];
  curriculum: CurriculumData;
}) {
  const { language } = useLanguage();
  const [activeDomain, setActiveDomain] = useState<string>(
    curriculum.domains[0]?.name_en ?? "",
  );

  const relatedCourses = courses.filter((course) =>
    course.domains.includes(activeDomain),
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        eyebrow="Structure"
        title="Curriculum Logic"
      />

      <section className="rounded-[2rem] border border-[var(--line)] p-6 lg:p-8">
        <div className="grid gap-4 lg:grid-cols-5">
          {curriculum.logicFlow.map((item, index) => (
            <div
              key={item.en}
              className="flex min-h-32 flex-col justify-between rounded-[1.5rem] border border-[var(--line)] bg-[var(--card)] p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                0{index + 1}
              </p>
              <p className="font-serif text-xl leading-snug">
                {formatText(item.zh, item.en, language)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="border-b border-[var(--line)] pb-4">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              {uiLabel(language, "基础领域", "Foundational Domains")}
            </p>
          </div>
          <div className="grid gap-3">
            {curriculum.domains.map((domain) => {
              const domainName = domain.name_en;
              const isActive = domainName === activeDomain;

              return (
                <button
                  key={domain.name_en}
                  type="button"
                  onClick={() => setActiveDomain(domainName)}
                  className={cn(
                    "rounded-[1.25rem] border p-5 text-left transition-colors",
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "border-[var(--line)] bg-white hover:bg-[var(--card)]",
                  )}
                >
                  <p className="font-serif text-xl">
                    {formatText(domain.name_zh, domain.name_en, language)}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    {uiLabel(language, "查看相关课程", "View related courses")}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 lg:p-8">
          <div>
            <p className="font-serif text-3xl leading-tight">
              {formatText(
                curriculum.domains.find((entry) => entry.name_en === activeDomain)?.name_zh ?? "",
                curriculum.domains.find((entry) => entry.name_en === activeDomain)?.name_en ?? "",
                language,
              )}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {formatText(
                curriculum.domains.find((entry) => entry.name_en === activeDomain)?.description_zh ?? "",
                curriculum.domains.find((entry) => entry.name_en === activeDomain)?.description_en ?? "",
                language,
              )}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              {uiLabel(language, "关联课程", "Related Courses")}
            </p>
            <div className="mt-4 grid gap-3">
              {relatedCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4"
                >
                  <p className="font-medium">{titleForCourse(course, language)}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{course.layer}</p>
                </div>
              ))}
              {!relatedCourses.length ? (
                <div className="rounded-[1.25rem] border border-dashed border-[var(--line)] bg-white p-4 text-sm text-[var(--muted)]">
                  {uiLabel(language, "当前领域下暂无课程。", "No courses found under the current domain.")}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
