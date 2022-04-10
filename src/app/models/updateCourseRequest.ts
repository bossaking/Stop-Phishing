import {Lesson} from "./lesson";
import {SimpleLesson} from "./simpleLesson";

export interface UpdateCourseRequest{
  name:string;
  title:string;
  description:string;
  updatedLessons : Lesson[];
  deletedLessonsIds : string[];
  createdLessons : SimpleLesson[];
}
