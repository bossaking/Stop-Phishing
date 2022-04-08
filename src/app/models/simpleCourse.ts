import {SimpleLesson} from "./simpleLesson";

export interface SimpleCourse{
  name:string;
  title:string;
  description:string;
  lessons:SimpleLesson[];
}
