import courses from "../../../data/courses.json";
import curriculum from "../../../data/curriculum.json";
import { LogicPage } from "@/components/curriculum/logic-page";
import { Course, CurriculumData } from "@/types/curriculum";

export default function Page() {
  return (
    <LogicPage
      courses={courses as Course[]}
      curriculum={curriculum as CurriculumData}
    />
  );
}
