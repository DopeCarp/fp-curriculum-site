"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  cn,
  firstNumericValue,
  formatText,
  hasNumericValue,
  textForObjective,
  titleForCourse,
  uiLabel,
} from "@/lib/utils";
import { Course, CurriculumData } from "@/types/curriculum";

type FilterState = {
  category: "All" | "Foundation" | "Public";
  semester: "All" | number;
  unit: "All" | number;
  courseType: "All" | Course["course_type"];
  ability: "All" | string;
};

const units = [1, 2, 3, 4, 5, 6, 7, 8];
const semesters = [1, 2, 3, 4];

const matrixRows: Array<{
  key: string;
  group: "Foundation" | "Public";
  row: string;
}> = [
  {
    key: "studio",
    group: "Foundation",
    row: "Foundation Courses / Studio",
  },
  {
    key: "foundational-studio",
    group: "Foundation",
    row: "Foundation Courses / Foundational Studio",
  },
  {
    key: "seminar",
    group: "Foundation",
    row: "Foundation Courses / Seminar-Lecture",
  },
  {
    key: "professional-development",
    group: "Foundation",
    row: "Foundation Courses / Professional Development",
  },
  {
    key: "public",
    group: "Public",
    row: "Public Courses",
  },
];

export function CourseMatrixPage({
  courses,
  curriculum,
}: {
  courses: Course[];
  curriculum: CurriculumData;
}) {
  const { language } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    semester: "All",
    unit: "All",
    courseType: "All",
    ability: "All",
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (filters.category !== "All" && course.category !== filters.category) return false;
      if (filters.semester !== "All" && !hasNumericValue(course.semester, filters.semester)) {
        return false;
      }
      if (filters.unit !== "All" && !hasNumericValue(course.unit, filters.unit)) return false;
      if (filters.courseType !== "All" && course.course_type !== filters.courseType) {
        return false;
      }
      if (filters.ability !== "All" && !course.abilities.includes(filters.ability)) {
        return false;
      }
      return true;
    });
  }, [courses, filters]);

  const relatedCourses = useMemo(() => {
    if (!selectedCourse) return [];

    return courses
      .filter((course) => course.id !== selectedCourse.id)
      .filter((course) => {
        const sharedDomains = course.domains.some((domain) =>
          selectedCourse.domains.includes(domain),
        );
        const sharedAbilities = course.abilities.some((ability) =>
          selectedCourse.abilities.includes(ability),
        );
        return sharedDomains || sharedAbilities;
      })
      .sort(
        (a, b) =>
          firstNumericValue(a.semester) - firstNumericValue(b.semester) ||
          firstNumericValue(a.unit) - firstNumericValue(b.unit),
      )
      .slice(0, 4);
  }, [courses, selectedCourse]);

  return (
    <div className="mx-auto flex max-w-[96rem] flex-col gap-8 px-6 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        eyebrow="Curriculum Table"
        title="Course Matrix"
      />

      <section className="grid gap-3 rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-5 lg:grid-cols-5 lg:p-6">
        <FilterSelect
          label={uiLabel(language, "类别", "Category")}
          value={filters.category}
          onChange={(value) =>
            setFilters((current) => ({ ...current, category: value as FilterState["category"] }))
          }
          options={[
            { value: "All", label: uiLabel(language, "全部", "All") },
            { value: "Foundation", label: uiLabel(language, "基础课程", "Foundation") },
            { value: "Public", label: uiLabel(language, "公共课程", "Public") },
          ]}
        />
        <FilterSelect
          label={uiLabel(language, "学期", "Semester")}
          value={String(filters.semester)}
          onChange={(value) =>
            setFilters((current) => ({
              ...current,
              semester: value === "All" ? "All" : Number(value),
            }))
          }
          options={[
            { value: "All", label: uiLabel(language, "全部", "All") },
            { value: "1", label: uiLabel(language, "第一学期", "Semester 1") },
            { value: "2", label: uiLabel(language, "第二学期", "Semester 2") },
            { value: "3", label: uiLabel(language, "第三学期", "Semester 3") },
            { value: "4", label: uiLabel(language, "第四学期", "Semester 4") },
          ]}
        />
        <FilterSelect
          label={uiLabel(language, "单元", "Unit")}
          value={String(filters.unit)}
          onChange={(value) =>
            setFilters((current) => ({
              ...current,
              unit: value === "All" ? "All" : Number(value),
            }))
          }
          options={[
            { value: "All", label: uiLabel(language, "全部", "All") },
            ...units.map((unit) => ({
              value: String(unit),
              label: uiLabel(language, `单元 ${unit}`, `Unit ${unit}`),
            })),
          ]}
        />
        <FilterSelect
          label={uiLabel(language, "课程类型", "Course Type")}
          value={filters.courseType}
          onChange={(value) =>
            setFilters((current) => ({
              ...current,
              courseType: value as FilterState["courseType"],
            }))
          }
          options={[
            { value: "All", label: uiLabel(language, "全部", "All") },
            { value: "Studio", label: "Studio" },
            { value: "Foundational Studio", label: "Foundational Studio" },
            { value: "Seminar-Lecture", label: "Seminar / Lecture" },
            { value: "Professional Development", label: "Professional Development" },
          ]}
        />
        <FilterSelect
          label={uiLabel(language, "能力", "Ability")}
          value={filters.ability}
          onChange={(value) =>
            setFilters((current) => ({ ...current, ability: value as FilterState["ability"] }))
          }
          options={[
            { value: "All", label: uiLabel(language, "全部", "All") },
            ...curriculum.abilities.map((item) => ({
              value: item.name_en,
              label: formatText(item.name_zh, item.name_en, language),
            })),
          ]}
        />
      </section>

      <section className="overflow-x-auto rounded-[2rem] border border-[var(--line)] bg-white">
        <div className="grid min-w-[90rem] grid-cols-[8rem_15rem_repeat(8,minmax(0,1fr))]">
          <div className="border-b border-r border-[var(--line)] bg-[var(--card)] p-4 text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            {uiLabel(language, "课程学期", "Semester")}
          </div>
          <div className="border-b border-r border-[var(--line)] bg-[var(--card)] p-4" />
          {semesters.map((semester) => (
            <div
              key={semester}
              className="col-span-2 border-b border-[var(--line)] p-4 text-center text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
            >
              <div>{uiLabel(language, `${ordinalSemesterZh(semester)}学期`, `${ordinalSemesterEn(semester)} Semester`)}</div>
            </div>
          ))}

          <div className="border-b border-r border-[var(--line)] bg-[var(--card)] p-4 text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
            {uiLabel(language, "单元", "Unit")}
          </div>
          <div className="border-b border-r border-[var(--line)] bg-[var(--card)] p-4" />
          {units.map((unit) => (
            <div
              key={unit}
              className="border-b border-[var(--line)] p-4 text-center text-xs uppercase tracking-[0.16em] text-[var(--muted)]"
            >
              <div>{uiLabel(language, `单元${chineseUnit(unit)}`, `Unit ${unit}`)}</div>
              <div className="mt-1 normal-case tracking-normal text-[11px] text-[var(--muted)]">
                {uiLabel(language, unit % 2 === 1 ? "前 8 周" : "后 8 周", unit % 2 === 1 ? "Weeks 1-8" : "Weeks 9-16")}
              </div>
            </div>
          ))}

          {matrixRows.map((row, rowIndex) => (
            <MatrixRow
              key={row.key}
              row={row.row}
              rowIndex={rowIndex}
              showGroupLabel={rowIndex === 0 || row.group !== matrixRows[rowIndex - 1]?.group}
              groupLabel={row.group}
              groupSpan={row.group === "Foundation" ? 4 : 1}
              courses={filteredCourses}
              language={language}
              onSelect={setSelectedCourse}
            />
          ))}

          <div className="border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6" />
          <div className="whitespace-pre-line border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6">
            {uiLabel(language, "通识课\nGeneral Courses", "General Courses")}
          </div>
          {curriculum.semesterSummary.map((item) => (
            <div
              key={`general-${item.semester}`}
              className={cn(
                "col-span-2 border-t border-[var(--line)] p-5 text-center",
                semesterTone(item.semester * 2 - 1),
              )}
            >
              <p className="font-serif text-2xl text-[var(--foreground)]">{item.general_credits}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {uiLabel(language, "学分", "credits")}
              </p>
            </div>
          ))}

          <div className="border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6" />
          <div className="whitespace-pre-line border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6">
            {uiLabel(language, "总学分数\nTotal Credits", "Total Credits")}
          </div>
          {curriculum.semesterSummary.map((item) => (
            <div
              key={`total-${item.semester}`}
              className={cn(
                "col-span-2 border-t border-[var(--line)] p-5 text-center",
                semesterTone(item.semester * 2 - 1),
              )}
            >
              <p className="font-serif text-2xl text-[var(--foreground)]">{item.total_credits}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {uiLabel(language, "学分", "credits")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedCourse ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-xl flex-col overflow-y-auto border-l border-[var(--line)] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                    {uiLabel(
                      language,
                      selectedCourse.category === "Foundation" ? "基础课程" : "公共课程",
                      selectedCourse.category,
                    )}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight">
                    {titleForCourse(selectedCourse, language)}
                  </h2>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-[var(--line)] px-3 py-1 text-sm"
                  onClick={() => setSelectedCourse(null)}
                >
                  {uiLabel(language, "关闭", "Close")}
                </button>
              </div>
              <div className="grid gap-6 py-6 text-sm leading-7 text-[var(--muted)]">
                <div className="grid grid-cols-2 gap-3">
                  <InfoCell
                    label={uiLabel(language, "课程类型", "Course Type")}
                    value={translateCourseType(selectedCourse.course_type, language)}
                  />
                  <InfoCell
                    label={uiLabel(language, "学分", "Credits")}
                    value={uiLabel(language, `${selectedCourse.credits} 学分`, `${selectedCourse.credits}`)}
                  />
                  <InfoCell
                    label={uiLabel(language, "学期", "Semester")}
                    value={formatCoursePlacement(selectedCourse.semester, language, "学期", "Semester")}
                  />
                  <InfoCell
                    label={uiLabel(language, "单元", "Unit")}
                    value={formatCoursePlacement(selectedCourse.unit, language, "单元", "Unit")}
                  />
                  <InfoCell label={uiLabel(language, "层级", "Layer")} value={selectedCourse.layer} />
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                    {uiLabel(language, "课程目标", "Objective")}
                  </p>
                  <p>{textForObjective(selectedCourse, language)}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                    {uiLabel(language, "基础领域", "Domains")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.domains.map((domain) => (
                      <span
                        key={domain}
                        className="rounded-full border border-[var(--line)] px-3 py-1"
                      >
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
                    {selectedCourse.abilities.map((ability) => (
                      <span
                        key={ability}
                        className="rounded-full border border-[var(--line)] px-3 py-1"
                      >
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
                      relatedCourses.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => setSelectedCourse(course)}
                          className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--card)] p-4 text-left transition-colors hover:bg-[var(--accent-soft)]"
                        >
                          <p className="font-medium text-[var(--foreground)]">
                            {titleForCourse(course, language)}
                          </p>
                        </button>
                      ))
                    ) : (
                      <p>{uiLabel(language, "暂无可显示的相关课程。", "No related courses available.")}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MatrixRow({
  row,
  rowIndex,
  showGroupLabel,
  groupLabel,
  groupSpan,
  courses,
  language,
  onSelect,
}: {
  row: string;
  rowIndex: number;
  showGroupLabel: boolean;
  groupLabel: "Foundation" | "Public";
  groupSpan: number;
  courses: Course[];
  language: ReturnType<typeof useLanguage>["language"];
  onSelect: (course: Course) => void;
}) {
  const rowCourses = courses.filter((course) => {
    if (row === "Public Courses") return course.category === "Public";
    return `${course.category} Courses / ${course.course_type}` === row;
  });

  return (
    <>
      {showGroupLabel ? (
        <div
          className="flex items-center justify-center border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6"
          style={{ gridRow: `span ${groupSpan} / span ${groupSpan}` }}
        >
          <div className="whitespace-pre-line">
            {translateMajorGroup(groupLabel, language)}
          </div>
        </div>
      ) : null}
      <div className="whitespace-pre-line border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6">
        {translateRow(row, language)}
      </div>
      {units.map((unit) => {
        const cellCourses = rowCourses.filter((course) => hasNumericValue(course.unit, unit));

        return (
          <div
            key={`${rowIndex}-${unit}`}
            className={cn("min-h-40 border-t border-[var(--line)] p-3", semesterTone(unit))}
          >
            {cellCourses.length ? (
              <div className="grid gap-3">
                {cellCourses.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => onSelect(course)}
                    className="rounded-[1rem] border border-[var(--line)] bg-white p-4 text-left transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    <p className="text-sm leading-6 text-[var(--foreground)]">
                      {titleForCourse(course, language)}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="relative h-full min-h-28 overflow-hidden rounded-[1rem] border border-[var(--line)] bg-white/50">
                <div className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_49.2%,var(--line)_49.5%,var(--line)_50.5%,transparent_50.8%)]" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition-colors focus:border-[var(--accent)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
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

function translateMajorGroup(
  group: "Foundation" | "Public",
  language: ReturnType<typeof useLanguage>["language"],
) {
  if (group === "Foundation") {
    return uiLabel(language, "基础课\nFoundation\nCourses", "Foundation Courses");
  }

  return uiLabel(language, "公共课\nPublic\nCourses", "Public Courses");
}

function translateRow(row: string, language: ReturnType<typeof useLanguage>["language"]) {
  const rowMap: Record<string, { zh: string; en: string }> = {
    "Foundation Courses / Studio": {
      zh: "Studio\n(4 credits)",
      en: "Studio\n(4 credits)",
    },
    "Foundation Courses / Foundational Studio": {
      zh: "Foundational Studio\n(3 credits)",
      en: "Foundational Studio\n(3 credits)",
    },
    "Foundation Courses / Seminar-Lecture": {
      zh: "Seminar /\nLecture\n(2 credits)",
      en: "Seminar /\nLecture\n(2 credits)",
    },
    "Foundation Courses / Professional Development": {
      zh: "Professional\nDevelopment\n(1 credit)",
      en: "Professional\nDevelopment\n(1 credit)",
    },
    "Public Courses": {
      zh: "Public Courses",
      en: "Public Courses",
    },
  };

  const item = rowMap[row];
  return item ? uiLabel(language, item.zh, item.en) : row;
}

function translateCourseType(
  type: Course["course_type"],
  language: ReturnType<typeof useLanguage>["language"],
) {
  const map: Record<Course["course_type"], { zh: string; en: string }> = {
    Studio: { zh: "Studio", en: "Studio" },
    "Foundational Studio": { zh: "Foundational Studio", en: "Foundational Studio" },
    "Seminar-Lecture": { zh: "Seminar / Lecture", en: "Seminar / Lecture" },
    "Professional Development": { zh: "Professional Development", en: "Professional Development" },
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

function semesterTone(unit: number) {
  const semester = Math.ceil(unit / 2);
  if (semester === 1) return "bg-[#f4f7fb]";
  if (semester === 2) return "bg-[#f7f8ef]";
  if (semester === 3) return "bg-[#faf1f0]";
  return "bg-[#f5f2fa]";
}

function ordinalSemesterZh(semester: number) {
  return ["第一", "第二", "第三", "第四"][semester - 1] ?? `第${semester}`;
}

function ordinalSemesterEn(semester: number) {
  return ["First", "Second", "Third", "Fourth"][semester - 1] ?? `Semester ${semester}`;
}

function chineseUnit(unit: number) {
  return ["一", "二", "三", "四", "五", "六", "七", "八"][unit - 1] ?? String(unit);
}

function formatCoursePlacement(
  value: number | number[],
  language: ReturnType<typeof useLanguage>["language"],
  labelZh: string,
  labelEn: string,
) {
  const values = Array.isArray(value) ? value : [value];
  if (values.length === 1) {
    return uiLabel(language, `${labelZh} ${values[0]}`, `${labelEn} ${values[0]}`);
  }

  return uiLabel(
    language,
    `${labelZh} ${values.join(" / ")}`,
    `${labelEn} ${values.join(" / ")}`,
  );
}
