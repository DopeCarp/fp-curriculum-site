"use client";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { DetailDrawer } from "@/components/shared/detail-drawer";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatText, titleForCourse, uiLabel } from "@/lib/utils";
import { Course, CurriculumData, PathwayStage } from "@/types/curriculum";

export function HomePage({
  curriculum,
  courses,
}: {
  curriculum: CurriculumData;
  courses: Course[];
}) {
  const { language } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<PathwayStage | null>(null);
  const abilityMap = useMemo(
    () => new Map(curriculum.abilities.map((ability) => [ability.name_en, ability])),
    [curriculum.abilities],
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        eyebrow={uiLabel(language, "F+P 学组", "F+P Group")}
        title={uiLabel(language, "设计教育理念", "Design Education Philosophy")}
      />

      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-3 lg:p-4">
        <div className="mb-3 flex items-end justify-between gap-4 px-2 pt-1">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
            {uiLabel(language, "课程路径图示", "Curriculum Pathway Diagram")}
          </p>
        </div>
        <PathwayDiagram language={language} />
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 lg:p-8">
        <p className="mb-8 text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
          {uiLabel(language, "课程路径", "Pathway")}
        </p>
        <div className="grid gap-4 md:grid-cols-4">
          {curriculum.pathway.map((item, index) => (
            <motion.button
              key={item.year}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              type="button"
              onClick={() => setSelectedStage(item)}
              className="relative min-h-44 overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white p-5 text-left transition-colors hover:bg-[var(--accent-soft)]"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {item.year}
              </p>
              <h2 className="mt-6 font-serif text-2xl leading-tight">
                {formatText(item.title_zh, item.title_en, language)}
              </h2>
              <p className="mt-8 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                {uiLabel(language, "查看详情", "View details")}
              </p>
            </motion.button>
          ))}
        </div>
      </section>

      <DetailDrawer
        open={Boolean(selectedStage)}
        title={selectedStage ? formatText(selectedStage.title_zh, selectedStage.title_en, language) : ""}
        subtitle={selectedStage?.year}
        closeLabel={uiLabel(language, "关闭", "Close")}
        onClose={() => setSelectedStage(null)}
      >
        {selectedStage ? (
          <div className="grid gap-6 text-sm leading-7 text-[var(--muted)]">
            <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--card)] p-4">
              <p>{formatText(selectedStage.description_zh, selectedStage.description_en, language)}</p>
            </div>
            {selectedStage.groups?.length ? (
              <StageGroups
                title={uiLabel(language, "学组", "Groups")}
                groups={selectedStage.groups}
                language={language}
              />
            ) : null}
            <StageCourses
              title={uiLabel(language, "支撑课程", "Supporting Courses")}
              courses={getRelatedCoursesForStage(selectedStage, courses)}
              language={language}
            />
            <StageAbilities
              title={uiLabel(language, "能力", "Abilities")}
              abilities={getRelatedAbilitiesForStage(selectedStage, courses)}
              abilityMap={abilityMap}
              language={language}
            />
          </div>
        ) : null}
      </DetailDrawer>
    </div>
  );
}

function StageGroups({
  title,
  groups,
  language,
}: {
  title: string;
  groups: NonNullable<PathwayStage["groups"]>;
  language: ReturnType<typeof useLanguage>["language"];
}) {
  return (
    <section className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{title}</p>
      <div className="mt-4 grid gap-3">
        {groups.map((group) => (
          <div
            key={group.name_en}
            className="rounded-[1rem] border border-[var(--line)] bg-[var(--card)] px-4 py-4 text-[var(--foreground)]"
          >
            {formatText(group.name_zh, group.name_en, language)}
          </div>
        ))}
      </div>
    </section>
  );
}

function StageCourses({
  title,
  courses,
  language,
}: {
  title: string;
  courses: Course[];
  language: ReturnType<typeof useLanguage>["language"];
}) {
  return (
    <section className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{title}</p>
      <div className="mt-4 grid gap-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-[1rem] border border-[var(--line)] bg-[var(--card)] px-4 py-3"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-[var(--foreground)]">{titleForCourse(course, language)}</p>
              <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs whitespace-nowrap">
                {uiLabel(language, `${course.credits} 学分`, `${course.credits} cr`)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StageAbilities({
  title,
  abilities,
  abilityMap,
  language,
}: {
  title: string;
  abilities: string[];
  abilityMap: Map<string, CurriculumData["abilities"][number]>;
  language: ReturnType<typeof useLanguage>["language"];
}) {
  return (
    <section className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{title}</p>
      <div className="mt-4 grid gap-3">
        {abilities.map((abilityName) => {
          const ability = abilityMap.get(abilityName);
          if (!ability) return null;

          return (
            <div
              key={ability.name_en}
              className="rounded-[1rem] border border-[var(--line)] bg-[var(--card)] px-4 py-3"
            >
              <p className="font-medium text-[var(--foreground)]">
                {formatText(ability.name_zh, ability.name_en, language)}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {formatText(ability.description_zh, ability.description_en, language)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getRelatedCoursesForStage(stage: PathwayStage, courses: Course[]) {
  const layerByStage: Record<string, string[]> = {
    "Shared Foundation": ["Shared Foundation"],
    "Bridging Specialization": ["Design Realization and Digital Media"],
    "Capability Growth": ["Interaction and System Collaboration"],
    Spinovation: ["Interaction and System Collaboration"],
  };

  const layers = layerByStage[stage.title_en] ?? [];
  const related = courses.filter(
    (course) => course.category === "Foundation" && layers.includes(course.layer),
  );

  return related.slice(0, 6);
}

function getRelatedAbilitiesForStage(stage: PathwayStage, courses: Course[]) {
  const relatedCourses = getRelatedCoursesForStage(stage, courses);
  return Array.from(new Set(relatedCourses.flatMap((course) => course.abilities)));
}

function PathwayDiagram({
  language,
}: {
  language: ReturnType<typeof useLanguage>["language"];
}) {
  return (
    <div className="overflow-x-auto rounded-[1.35rem] bg-[#fbfbfb] p-4 lg:p-6">
      <div className="mx-auto max-w-[1400px]">
        <img
          src="/slide-images/pathway-slide-alt.png"
          alt={uiLabel(language, "课程路径图示", "Curriculum pathway diagram")}
          className="h-auto w-full rounded-[1.1rem] object-contain"
        />
      </div>
    </div>
  );
}
