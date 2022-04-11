import {SimpleAnswer} from "./simpleAnswer";

export interface SimpleQuestion{
  id:string;
  title:string;
  rightAnswerCommunicate:string;
  badAnswerCommunicate:string;
  image:string;
  answers:SimpleAnswer[];
}
