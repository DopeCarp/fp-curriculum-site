import curriculum from "../../../data/curriculum.json";
import { TeachingModelPage } from "@/components/curriculum/teaching-model-page";
import { CurriculumData } from "@/types/curriculum";

export default function Page() {
  return <TeachingModelPage curriculum={curriculum as CurriculumData} />;
}
