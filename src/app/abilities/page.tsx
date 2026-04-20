import courses from "../../../data/courses.json";
import curriculum from "../../../data/curriculum.json";
import { AbilitiesPage } from "@/components/curriculum/abilities-page";
import { Course, CurriculumData } from "@/types/curriculum";

export default function Page() {
  return (
    <AbilitiesPage
      courses={courses as Course[]}
      curriculum={curriculum as CurriculumData}
    />
  );
}
