import {CreateAnswerRequest} from "./createAnswerRequest";

export interface CreateQuestionRequest {
  imageNumber: number | null;
  title: string;
  rightAnswerCommunicate: string;
  badAnswerCommunicate: string;
  answers: CreateAnswerRequest[];
}
