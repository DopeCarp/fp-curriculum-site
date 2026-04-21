export type LanguageMode = "zh" | "en" | "both";

export type Course = {
  no?: number | null;
  id: string;
  title_zh: string;
  title_en: string;
  category: "Foundation" | "Public";
  course_type:
    | "Studio"
    | "Foundational Studio"
    | "Seminar or Lecture"
    | "Professional Development";
  credits: number;
  semester: number | number[];
  unit: number | number[];
  layer: string;
  domains: string[];
  abilities: string[];
  objective_zh: string;
  objective_en: string;
  reference: string;
  existing_course: string;
  theory_hours?: number | null;
  practice_hours?: number | null;
};

export type BilingualLabel = {
  zh: string;
  en: string;
};

export type BilingualDescription = {
  description_zh: string;
  description_en: string;
};

export type DetailList = {
  title_zh: string;
  title_en: string;
  items_zh: string[];
  items_en: string[];
};

export type PathwayStage = {
  year: string;
  title_zh: string;
  title_en: string;
} & BilingualDescription & {
  groups?: Array<{
    name_zh: string;
    name_en: string;
    href?: string | null;
  }>;
  skill_zh: string[];
  skill_en: string[];
  knowledge_zh: string[];
  knowledge_en: string[];
  competence_zh: string[];
  competence_en: string[];
};

export type TeachingModelStage = {
  name_zh: string;
  name_en: string;
} & BilingualDescription & {
  focus_zh: string[];
  focus_en: string[];
  outputs_zh: string[];
  outputs_en: string[];
  collaboration_zh: string[];
  collaboration_en: string[];
};

export type CurriculumData = {
  overview: {
    intro_zh: string;
    intro_en: string;
    reading_zh: string;
    reading_en: string;
  };
  semesterSummary: Array<{
    semester: number;
    foundation_zh: string;
    foundation_en: string;
    public_zh: string;
    public_en: string;
    general_zh: string;
    general_en: string;
    general_credits: number;
    practice_zh?: string;
    practice_en?: string;
    practice_credits?: number;
    total_credits: number;
  }>;
  pathway: PathwayStage[];
  keywords: BilingualLabel[];
  logicFlow: BilingualLabel[];
  domains: Array<{ name_zh: string; name_en: string } & BilingualDescription>;
  layers: Array<{ name_zh: string; name_en: string }>;
  abilities: Array<{ name_zh: string; name_en: string } & BilingualDescription>;
  teachingModel: TeachingModelStage[];
};
