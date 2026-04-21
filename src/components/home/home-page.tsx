"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { DetailDrawer } from "@/components/shared/detail-drawer";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatText, uiLabel } from "@/lib/utils";
import { CurriculumData, PathwayStage } from "@/types/curriculum";

export function HomePage({ curriculum }: { curriculum: CurriculumData }) {
  const { language } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<PathwayStage | null>(null);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        eyebrow={uiLabel(language, "F+P 学组", "F+P Group")}
        title={uiLabel(language, "公共与基础课程", "Public & Foundation Courses")}
        description={formatText(
          "F+P 前四学期课程路径与结构。",
          "The curriculum pathway and structure across the first four semesters of F+P.",
          language,
        )}
      />

      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-3 lg:p-4">
        <div className="mb-3 flex items-end justify-between gap-4 px-2 pt-1">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
            {uiLabel(language, "课程路径图示", "Curriculum Pathway Diagram")}
          </p>
          <p className="text-[11px] text-[var(--muted)]">
            {uiLabel(language, "引自 0416 slides", "From 0416 slides")}
          </p>
        </div>
        <img
          src="/slide-images/pathway-slide-alt.png"
          alt="Curriculum pathway diagram from slides"
          className="w-full rounded-[1.35rem] bg-[#fbfbfb]"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 lg:p-8">
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
        </div>

        <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 lg:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            {uiLabel(language, "路径概览", "Pathway Overview")}
          </p>
          <p className="mt-6 font-serif text-3xl leading-tight">
            {formatText(
              "从共享基础进入设计实现、数字媒介与系统协作。",
              "From shared foundation to design realization, digital media, and system collaboration.",
              language,
            )}
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <div className="border-b border-[var(--line)] pb-4">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            {uiLabel(language, "关键词", "Keywords")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {curriculum.keywords.map((item) => (
            <div
              key={item.en}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--foreground)]"
            >
              {formatText(item.zh, item.en, language)}
            </div>
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
            <StageList
              title={uiLabel(language, "技能", "Skills")}
              items={language === "en" ? selectedStage.skill_en : selectedStage.skill_zh}
            />
            <StageList
              title={uiLabel(language, "知识", "Knowledge")}
              items={language === "en" ? selectedStage.knowledge_en : selectedStage.knowledge_zh}
            />
            <StageList
              title={uiLabel(language, "能力", "Competence")}
              items={language === "en" ? selectedStage.competence_en : selectedStage.competence_zh}
            />
          </div>
        ) : null}
      </DetailDrawer>
    </div>
  );
}

function StageList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[1.25rem] border border-[var(--line)] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-[var(--foreground)]"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
