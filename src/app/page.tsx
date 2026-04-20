import curriculum from "../../data/curriculum.json";
import { HomePage } from "@/components/home/home-page";
import { CurriculumData } from "@/types/curriculum";

export default function Page() {
  return <HomePage curriculum={curriculum as CurriculumData} />;
}
