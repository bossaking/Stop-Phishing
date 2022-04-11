import {SimpleLesson} from "./simpleLesson";

export interface SimpleCourse{
  name:string;
  title:string;
  description:string;
  testId:string|null;
  lessons:SimpleLesson[];
}
