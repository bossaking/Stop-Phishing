import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Course} from "../models/Course";
import {CourseService} from "../services/course.service";

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {

  @Output()
  removeEvent = new EventEmitter();
  toggleChangedEvent = new EventEmitter();

  title = new FormControl('');

  isRight : boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  remove(){
    this.removeEvent.emit();
  }

  toggleChanged(){
    this.isRight = !this.isRight;
    if(this.isRight)
    this.toggleChangedEvent.emit();
  }
}
