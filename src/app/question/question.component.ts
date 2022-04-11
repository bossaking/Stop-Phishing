import {Component, Input, OnInit} from '@angular/core';
import {SimpleQuestion} from "../models/simpleQuestion";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input()
  question : SimpleQuestion | undefined;

  answered : boolean = false;
  selectedAnswer : number | undefined;
  answeredRight : boolean | undefined;

  noImage : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.noImage = this.question?.image.split('/').pop() === 'null';
  }


  selectAnswer(index:number, isRight : boolean){
    this.answered = true;
    this.selectedAnswer = index;
    this.answeredRight = isRight;
  }
}
