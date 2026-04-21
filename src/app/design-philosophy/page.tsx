import curriculum from "../../../data/curriculum.json";
import courses from "../../../data/courses.json";
import { HomePage } from "@/components/home/home-page";
import { Course, CurriculumData } from "@/types/curriculum";

export default function Page() {
  return <HomePage curriculum={curriculum as CurriculumData} courses={courses as Course[]} />;
}
