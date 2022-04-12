import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SimpleAnswer} from "../models/simpleAnswer";
import {Statuses} from "../models/statuses";

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit {

  @Input()
  answer : SimpleAnswer | undefined;

  @Output()
  removeExistedEvent = new EventEmitter();
  toggleChangedEvent = new EventEmitter();

  title = new FormControl('');

  isRight : boolean | undefined;

  readonly : boolean = true;

  status : Statuses = Statuses.notChanged;

  constructor() {
  }

  ngOnInit(): void {
    this.title.setValue(this.answer?.title);
    this.isRight = this.answer?.isRight;
  }

  remove(){
    this.removeExistedEvent.emit();
  }

  toggleChanged(){
    this.isRight = !this.isRight;
    if(this.isRight)
      this.toggleChangedEvent.emit();
  }

  edit(){
    this.readonly = false;
    this.status = Statuses.edited;
  }
}
