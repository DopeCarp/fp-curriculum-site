"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { DetailDrawer } from "@/components/shared/detail-drawer";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatText, uiLabel } from "@/lib/utils";
import { CurriculumData, TeachingModelStage } from "@/types/curriculum";

export function TeachingModelPage({
  curriculum,
}: {
  curriculum: CurriculumData;
}) {
  const { language } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<TeachingModelStage | null>(null);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        eyebrow="Pedagogy"
        title="Teaching Model"
      />

      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 lg:p-8">
        <div className="overflow-x-auto">
          <div className="grid min-w-[56rem] grid-cols-[repeat(4,minmax(0,1fr))] gap-4">
            {curriculum.teachingModel.map((item, index) => (
              <button
                key={`flow-${item.name_en}`}
                type="button"
                onClick={() => setSelectedStage(item)}
                className="relative rounded-[1.5rem] border border-[var(--line)] bg-[var(--card)] p-5 text-left transition-colors hover:bg-[var(--accent-soft)]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  {uiLabel(language, `阶段 0${index + 1}`, `Stage 0${index + 1}`)}
                </p>
                <h2 className="mt-5 font-serif text-2xl leading-tight">
                  {formatText(item.name_zh, item.name_en, language)}
                </h2>
                <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {uiLabel(language, "查看详情", "View details")}
                </p>
                {index < curriculum.teachingModel.length - 1 ? (
                  <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[var(--line)] lg:block" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              {uiLabel(language, "PBL Studio", "PBL Studio")}
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight">
              {uiLabel(language, "Studio 课程的上课形式", "How Studio Courses Are Taught")}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { zh: "项目主题", en: "Project Theme" },
              { zh: "问题驱动", en: "Problem Framing" },
              { zh: "阶段展示", en: "Presentation" },
            ].map((item) => (
              <div
                key={item.en}
                className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--card)] p-5 text-[var(--foreground)]"
              >
                <p className="font-serif text-2xl leading-tight">
                  {formatText(item.zh, item.en, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DetailDrawer
        open={Boolean(selectedStage)}
        title={selectedStage ? formatText(selectedStage.name_zh, selectedStage.name_en, language) : ""}
        subtitle={uiLabel(language, "Teaching Stage", "Teaching Stage")}
        onClose={() => setSelectedStage(null)}
      >
        {selectedStage ? (
          <div className="grid gap-6 text-sm leading-7 text-[var(--muted)]">
            <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--card)] p-4">
              <p>{formatText(selectedStage.description_zh, selectedStage.description_en, language)}</p>
            </div>
            <TeachingList
              title={uiLabel(language, "Focus", "Focus")}
              items={language === "en" ? selectedStage.focus_en : selectedStage.focus_zh}
            />
            <TeachingList
              title={uiLabel(language, "Outputs", "Outputs")}
              items={language === "en" ? selectedStage.outputs_en : selectedStage.outputs_zh}
            />
            <TeachingList
              title={uiLabel(language, "Collaboration", "Collaboration")}
              items={language === "en" ? selectedStage.collaboration_en : selectedStage.collaboration_zh}
            />
          </div>
        ) : null}
      </DetailDrawer>
    </div>
  );
}

function TeachingList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[1rem] border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)]"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
