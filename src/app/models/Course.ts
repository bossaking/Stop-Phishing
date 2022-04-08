import {Lesson} from "./lesson";

export interface Course{
  id:string;
  name:string;
  title:string;
  description:string;
  isComplete:boolean;
  lessons:Lesson[];
}
