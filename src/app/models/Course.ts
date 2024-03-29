import {Lesson} from "./lesson";

export interface Course{
  id:string;
  name:string;
  title:string;
  description:string;
  isComplete:boolean;
  testId:string|null;
  lessons:Lesson[];
}
