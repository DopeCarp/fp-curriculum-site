import courses from "../../../data/courses.json";
import curriculum from "../../../data/curriculum.json";
import { CourseMatrixPage } from "@/components/curriculum/course-matrix-page";
import { Course, CurriculumData } from "@/types/curriculum";

export default function Page() {
  return (
    <CourseMatrixPage
      courses={courses as Course[]}
      curriculum={curriculum as CurriculumData}
    />
  );
}
