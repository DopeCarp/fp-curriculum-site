"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { CourseDetailDrawer } from "@/components/shared/course-detail-drawer";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  cn,
  formatText,
  hasNumericValue,
  titleForCourse,
  uiLabel,
} from "@/lib/utils";
import { Course, CurriculumData } from "@/types/curriculum";

type FilterState = {
  category: "All" | "Foundation" | "Public" | "General" | "Practice";
  semester: "All" | number;
  courseType: "All" | Course["course_type"];
  ability: "All" | string;
};

const units = [1, 2, 3, 4, 5, 6, 7, 8];
const semesters = [1, 2, 3, 4];

const matrixRows: Array<{
  key: string;
  group: "Foundation" | "Public" | "General" | "Practice";
  row: string;
  rowType?: "courses" | "summary";
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
    row: "Foundation Courses / Seminar or Lecture",
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
  {
    key: "general",
    group: "General",
    row: "General Courses",
    rowType: "summary",
  },
  {
    key: "practice",
    group: "Practice",
    row: "Practice Courses",
    rowType: "summary",
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
    courseType: "All",
    ability: "All",
  });

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (
        filters.category !== "All" &&
        (filters.category === "Foundation" || filters.category === "Public") &&
        course.category !== filters.category
      ) {
        return false;
      }
      if (filters.category === "General" || filters.category === "Practice") return false;
      if (filters.semester !== "All" && !hasNumericValue(course.semester, filters.semester)) {
        return false;
      }
      if (filters.courseType !== "All" && course.course_type !== filters.courseType) {
        return false;
      }
      if (filters.ability !== "All" && !course.abilities.includes(filters.ability)) {
        return false;
      }
      return true;
    });
  }, [courses, filters]);

  return (
    <div className="mx-auto flex max-w-[96rem] flex-col gap-8 px-6 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        eyebrow={uiLabel(language, "课程矩阵", "Curriculum Matrix")}
        title={uiLabel(language, "课程矩阵", "Course Matrix")}
      />

      <section className="grid gap-3 rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-5 lg:grid-cols-4 lg:p-6">
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
            { value: "General", label: uiLabel(language, "通识课程", "General") },
            { value: "Practice", label: uiLabel(language, "集中实践课程", "Practice") },
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
            { value: "Studio", label: uiLabel(language, "工作室", "Studio") },
            { value: "Foundational Studio", label: uiLabel(language, "基础工作室", "Foundational Studio") },
            { value: "Seminar or Lecture", label: uiLabel(language, "研讨 / 讲授", "Seminar or Lecture") },
            { value: "Professional Development", label: uiLabel(language, "职业发展", "Professional Development") },
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
        <div className="grid min-w-[90rem] grid-cols-[8.5rem_15rem_repeat(8,minmax(0,1fr))]">
          <div className="border-b border-r border-[var(--line)] bg-[#f2f4f7] p-4 text-center text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            {uiLabel(language, "课程类别", "Category")}
          </div>
          <div className="border-b border-r border-[var(--line)] bg-[#f7f8fa] p-4 text-center text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            {uiLabel(language, "课程类型", "Type")}
          </div>
          {semesters.map((semester) => (
            <div
              key={semester}
              className="col-span-2 border-b border-[var(--line)] p-4 text-center text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
            >
              <div>{uiLabel(language, `${ordinalSemesterZh(semester)}学期`, `${ordinalSemesterEn(semester)} Semester`)}</div>
            </div>
          ))}

          <div className="col-span-2 border-b border-r border-[var(--line)] bg-[#fbfbfc] p-4" />
          {units.map((unit) => (
            <div
              key={unit}
              className="border-b border-[var(--line)] p-4 text-center text-xs uppercase tracking-[0.16em] text-[var(--muted)]"
            >
              <div>{uiLabel(language, `单元${chineseUnit(unit)}`, `Unit ${unit}`)}</div>
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
              curriculum={curriculum}
              rowType={row.rowType ?? "courses"}
              language={language}
              onSelect={setSelectedCourse}
            />
          ))}

          <div className="border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6" />
          <div className="whitespace-pre-line border-r border-t border-[var(--line)] bg-[var(--card)] p-5 text-center font-medium leading-6">
            {uiLabel(language, "总学分数\n（学分）", "Total Credits\n(Credits)")}
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
            </div>
          ))}
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

function MatrixRow({
  row,
  rowIndex,
  showGroupLabel,
  groupLabel,
  groupSpan,
  courses,
  curriculum,
  rowType,
  language,
  onSelect,
}: {
  row: string;
  rowIndex: number;
  showGroupLabel: boolean;
  groupLabel: "Foundation" | "Public" | "General" | "Practice";
  groupSpan: number;
  courses: Course[];
  curriculum: CurriculumData;
  rowType: "courses" | "summary";
  language: ReturnType<typeof useLanguage>["language"];
  onSelect: (course: Course) => void;
}) {
  if (rowType === "summary") {
    const collapseLabelColumn = groupLabel !== "Foundation";

    return (
      <>
        {showGroupLabel ? (
          <div
            className="flex items-center justify-center border-r border-t border-[var(--line)] bg-[#f2f4f7] p-4 text-center"
            style={{
              gridRow: `span ${groupSpan} / span ${groupSpan}`,
              gridColumn: collapseLabelColumn ? "span 2 / span 2" : undefined,
            }}
          >
            <div className="whitespace-pre-line text-base font-semibold leading-7 text-[var(--foreground)]">
              {translateMajorGroup(groupLabel, language)}
            </div>
          </div>
        ) : null}
        {!collapseLabelColumn ? (
          <div className="whitespace-pre-line border-r border-t border-[var(--line)] bg-[#f7f8fa] p-4 text-center">
            {translateRow(row, language)}
          </div>
        ) : null}
        {curriculum.semesterSummary.map((item) => {
          const value = row === "General Courses" ? item.general_credits : item.practice_credits ?? 0;
          return (
            <div
              key={`${row}-${item.semester}`}
              className={cn(
                "col-span-2 flex min-h-28 items-center justify-center border-t border-[var(--line)] p-5 text-center",
                semesterTone(item.semester * 2 - 1),
              )}
            >
              <p className="font-serif text-2xl text-[var(--foreground)]">{value}</p>
            </div>
          );
        })}
      </>
    );
  }

  const rowCourses = courses.filter((course) => {
    if (row === "Public Courses") return course.category === "Public";
    return `${course.category} Courses / ${course.course_type}` === row;
  });

  const collapseLabelColumn = groupLabel !== "Foundation";

  return (
    <>
      {showGroupLabel ? (
        <div
          className="flex items-center justify-center border-r border-t border-[var(--line)] bg-[#f2f4f7] p-4 text-center"
          style={{
            gridRow: `span ${groupSpan} / span ${groupSpan}`,
            gridColumn: collapseLabelColumn ? "span 2 / span 2" : undefined,
          }}
        >
          <div className="whitespace-pre-line text-base font-semibold leading-7 text-[var(--foreground)]">
            {translateMajorGroup(groupLabel, language)}
          </div>
        </div>
      ) : null}
      {!collapseLabelColumn ? (
        <div className="whitespace-pre-line border-r border-t border-[var(--line)] bg-[#f7f8fa] p-4 text-center">
          {translateRow(row, language)}
        </div>
      ) : null}
      {units.map((unit) => {
        const cellCourses = rowCourses.filter((course) => hasNumericValue(course.unit, unit));

        return (
          <div
            key={`${rowIndex}-${unit}`}
            className={cn("min-h-40 border-t border-[var(--line)] p-3", semesterTone(unit))}
          >
            {cellCourses.length ? (
              <div className="grid h-full gap-3">
                {cellCourses.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => onSelect(course)}
                    className="flex min-h-28 items-center rounded-[1rem] border border-[var(--line)] bg-white p-4 text-left transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    <div>
                      <p className="text-sm leading-6 text-[var(--foreground)]">
                        {titleForCourse(course, language)}
                      </p>
                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {uiLabel(language, `${course.credits}学分`, `${course.credits} Credits`)}
                      </p>
                    </div>
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
    <label className="grid min-w-0 gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full min-w-0 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 outline-none transition-colors focus:border-[var(--accent)]"
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

function translateMajorGroup(
  group: "Foundation" | "Public" | "General" | "Practice",
  language: ReturnType<typeof useLanguage>["language"],
) {
  if (group === "Foundation") {
    return uiLabel(language, "基础课", "Foundation Courses");
  }
  if (group === "Public") {
    return uiLabel(language, "公共课", "Public Courses");
  }
  if (group === "General") {
    return uiLabel(language, "通识课程", "General Courses");
  }

  return uiLabel(language, "集中实践课程", "Practice Courses");
}

function translateRow(row: string, language: ReturnType<typeof useLanguage>["language"]) {
  const rowMap: Record<string, { zh: string; en: string }> = {
    "Foundation Courses / Studio": {
      zh: "工作室\n（4学分）",
      en: "Studio\n(4 credits)",
    },
    "Foundation Courses / Foundational Studio": {
      zh: "基础工作室\n（3学分）",
      en: "Foundational Studio\n(3 credits)",
    },
    "Foundation Courses / Seminar or Lecture": {
      zh: "研讨 / 讲授\n（2学分）",
      en: "Seminar or\nLecture\n(2 credits)",
    },
    "Foundation Courses / Professional Development": {
      zh: "职业发展\n（1学分）",
      en: "Professional\nDevelopment\n(1 credit)",
    },
    "Public Courses": {
      zh: "公共课",
      en: "Public Courses",
    },
    "General Courses": {
      zh: "通识课程\n（学分）",
      en: "General Courses\n(Credits)",
    },
    "Practice Courses": {
      zh: "集中实践课程\n（学分）",
      en: "Practice Courses\n(Credits)",
    },
  };

  const item = rowMap[row];
  return item ? uiLabel(language, item.zh, item.en) : row;
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
