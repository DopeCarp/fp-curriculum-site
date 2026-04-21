"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { DetailDrawer } from "@/components/shared/detail-drawer";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatText, uiLabel } from "@/lib/utils";
import { CurriculumData, TeachingModelStage } from "@/types/curriculum";

const teachingStageLabels = ["01", "02", "02", "03"] as const;

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
        eyebrow={uiLabel(language, "教学组织", "Teaching Model")}
        title={uiLabel(language, "教学模型", "Teaching Model")}
      />

      <TeachingModelDiagram language={language} />

      <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 lg:p-8">
        <div className="overflow-x-auto">
          <div className="grid min-w-[56rem] grid-cols-[repeat(4,minmax(0,1fr))] gap-4">
            {curriculum.teachingModel.map((item, index) => (
              <StageCard
                key={`flow-${item.name_en}`}
                item={item}
                index={index}
                language={language}
                onSelect={setSelectedStage}
                stageLabel={index === 0 ? "01" : index === 1 ? "02" : index === 2 ? "02" : "03"}
                stageSubtitle={
                  index === 0
                    ? uiLabel(language, "统一授课", "Common Lectures")
                    : index === 1
                      ? uiLabel(language, "分组研讨", "Grouped Seminars")
                      : index === 2
                        ? uiLabel(language, "分组工作坊", "Grouped Workshops")
                        : uiLabel(language, "集中汇报 / 作品展示", "Final Presentation / Exhibition")
                }
              />
            ))}
          </div>
        </div>
      </section>

      <DetailDrawer
        open={Boolean(selectedStage)}
        title={selectedStage ? formatText(selectedStage.name_zh, selectedStage.name_en, language) : ""}
        subtitle={uiLabel(language, "教学阶段", "Teaching Stage")}
        closeLabel={uiLabel(language, "关闭", "Close")}
        onClose={() => setSelectedStage(null)}
      >
        {selectedStage ? (
          <div className="grid gap-6 text-sm leading-7 text-[var(--muted)]">
            <div className="rounded-[1.25rem] border border-[var(--line)] bg-[var(--card)] p-4">
              <p>{formatText(selectedStage.description_zh, selectedStage.description_en, language)}</p>
            </div>
            <TeachingList
              title={uiLabel(language, "重点", "Focus")}
              items={language === "en" ? selectedStage.focus_en : selectedStage.focus_zh}
            />
            <TeachingList
              title={uiLabel(language, "产出", "Outputs")}
              items={language === "en" ? selectedStage.outputs_en : selectedStage.outputs_zh}
            />
            <TeachingList
              title={uiLabel(language, "协作", "Collaboration")}
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

function StageCard({
  item,
  index,
  language,
  onSelect,
  compact = false,
  hideStageLabel = false,
  stageSubtitle,
  stageLabel,
}: {
  item: TeachingModelStage;
  index: number;
  language: ReturnType<typeof useLanguage>["language"];
  onSelect: (stage: TeachingModelStage) => void;
  compact?: boolean;
  hideStageLabel?: boolean;
  stageSubtitle?: string;
  stageLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--card)] p-5 text-left transition-colors hover:bg-[var(--accent-soft)]"
    >
      <div className="absolute left-0 top-0 h-1.5 w-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent)_32%,transparent_32%,transparent_100%)] opacity-80" />
      {!hideStageLabel ? (
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          {uiLabel(
            language,
            `阶段 ${stageLabel ?? teachingStageLabels[index] ?? `0${index + 1}`}`,
            `Stage ${stageLabel ?? teachingStageLabels[index] ?? `0${index + 1}`}`,
          )}
        </p>
      ) : null}
      <h2
        className={
          compact
            ? hideStageLabel
              ? "mt-1 font-serif text-[1.7rem] leading-tight"
              : "mt-4 font-serif text-[1.7rem] leading-tight"
            : "mt-5 font-serif text-2xl leading-tight"
        }
      >
        {formatText(item.name_zh, item.name_en, language)}
      </h2>
      {stageSubtitle ? (
        <p className={compact ? "mt-3 text-sm leading-6 text-[var(--muted)]" : "mt-3 text-sm leading-6 text-[var(--muted)]"}>
          {stageSubtitle}
        </p>
      ) : null}
      <p className={compact ? "mt-4 text-xs uppercase tracking-[0.18em] text-[var(--muted)]" : "mt-6 text-xs uppercase tracking-[0.18em] text-[var(--muted)]"}>
        {uiLabel(language, "查看详情", "View details")}
      </p>
    </button>
  );
}

function TeachingModelDiagram({
  language,
}: {
  language: ReturnType<typeof useLanguage>["language"];
}) {
  const commonLectures = uiLabel(language, "统一授课", "Common Lectures");
  const seminars = uiLabel(language, "分组讨论", "Grouped Seminars");
  const workshops = uiLabel(language, "分组工作坊", "Grouped Workshops");
  const finalPresentation = uiLabel(language, "集中汇报 / 作品展示", "Final Presentation / Exhibition");
  const sessions = uiLabel(language, "（2 sessions）", "(2 sessions)");

  return (
    <section className="rounded-[2rem] border border-[var(--line)] bg-white p-4 lg:p-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
          {uiLabel(language, "教学模型图示", "Teaching Model Diagram")}
        </p>
      </div>
      <div className="overflow-x-auto rounded-[1.5rem] border border-[var(--line)] bg-[#fcfcfd] p-4 lg:p-6">
        <div className="relative min-w-[980px]">
          <svg viewBox="0 0 1200 430" className="w-full" role="img" aria-label={finalPresentation}>
            <defs>
              <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>

            <rect x="20" y="90" width="210" height="165" rx="28" fill="#dff3f5" />

            <path
              d="M230 170 C380 170, 470 170, 560 170 C650 170, 700 125, 770 125 C860 125, 965 190, 1080 190"
              fill="none"
              stroke="#6bbdc8"
              strokeOpacity="0.55"
              strokeWidth="70"
              strokeLinecap="round"
              filter="url(#softBlur)"
            />
            <path
              d="M230 170 C380 170, 470 170, 560 170 C650 170, 700 125, 770 125 C860 125, 965 190, 1080 190"
              fill="none"
              stroke="#77c7d1"
              strokeOpacity="0.58"
              strokeWidth="56"
              strokeLinecap="round"
            />

            <path
              d="M230 170 C385 170, 495 170, 585 170 C680 170, 750 170, 1080 170"
              fill="none"
              stroke="#d7dbe7"
              strokeOpacity="0.7"
              strokeWidth="12"
              strokeLinecap="round"
            />

            <path
              d="M230 170 C365 170, 455 175, 545 240 C640 305, 735 280, 1080 240"
              fill="none"
              stroke="#f2b48c"
              strokeOpacity="0.5"
              strokeWidth="78"
              strokeLinecap="round"
              filter="url(#softBlur)"
            />
            <path
              d="M230 170 C365 170, 455 175, 545 240 C640 305, 735 280, 1080 240"
              fill="none"
              stroke="#f0a270"
              strokeOpacity="0.62"
              strokeWidth="58"
              strokeLinecap="round"
            />

            <path
              d="M760 118 C835 118, 925 160, 1065 190"
              fill="none"
              stroke="#f3cf79"
              strokeOpacity="0.6"
              strokeWidth="18"
              strokeLinecap="round"
            />

            <circle cx="770" cy="162" r="12" fill="#dee4ea" stroke="#c8cfdb" strokeWidth="2" />
            <circle cx="810" cy="162" r="12" fill="#ecd78c" stroke="#d5bf69" strokeWidth="2" />
            <circle cx="820" cy="258" r="12" fill="#f1d0bb" stroke="#dfb49b" strokeWidth="2" />
            <circle cx="795" cy="320" r="12" fill="#f7ddcc" stroke="#e3c2ad" strokeWidth="2" />

            <line x1="770" y1="162" x2="1060" y2="188" stroke="#d2d7df" strokeWidth="3" strokeLinecap="round" />
            <line x1="810" y1="162" x2="1060" y2="188" stroke="#d2d7df" strokeWidth="3" strokeLinecap="round" />
            <line x1="820" y1="258" x2="1060" y2="238" stroke="#d2d7df" strokeWidth="3" strokeLinecap="round" />
            <line x1="795" y1="320" x2="1060" y2="238" stroke="#d2d7df" strokeWidth="3" strokeLinecap="round" />

            <rect x="494" y="63" width="215" height="64" rx="24" fill="#477f87" fillOpacity="0.28" />
            <rect x="480" y="230" width="240" height="70" rx="24" fill="#e69a71" fillOpacity="0.24" />

            <circle cx="1045" cy="214" r="76" fill="#4c848b" fillOpacity="0.5" />
            <circle cx="1085" cy="214" r="76" fill="#678f72" fillOpacity="0.36" />
            <circle cx="1125" cy="214" r="76" fill="#c9982e" fillOpacity="0.42" />
            <rect x="1060" y="138" width="120" height="152" rx="32" fill="#f3be8a" fillOpacity="0.45" />

            <text x="125" y="150" textAnchor="middle" fontSize="28" fontWeight="700" fill="#111111">
              {commonLectures}
            </text>
            <text x="125" y="205" textAnchor="middle" fontSize="24" fill="#7a7f89">
              {sessions}
            </text>

            <text x="598" y="96" textAnchor="middle" fontSize="24" fontWeight="700" fill="#111111">
              {seminars}
            </text>
            <text x="600" y="272" textAnchor="middle" fontSize="24" fontWeight="700" fill="#111111">
              {workshops}
            </text>

            <text x="740" y="125" fontSize="20" fill="#7a7f89">Aesthetic</text>
            <text x="672" y="154" fontSize="20" fill="#7a7f89">
              {uiLabel(language, "知识", "Knowledge")}
            </text>
            <text x="800" y="188" fontSize="20" fill="#7a7f89">
              {uiLabel(language, "表达", "Expression")}
            </text>
            <text x="853" y="268" fontSize="20" fill="#7a7f89">
              {uiLabel(language, "工具", "Tools")}
            </text>
            <text x="730" y="343" fontSize="20" fill="#7a7f89">
              {uiLabel(language, "技能", "Skills")}
            </text>

            <text x="1115" y="188" textAnchor="middle" fontSize="22" fontWeight="700" fill="#ffffff">
              {finalPresentation}
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
