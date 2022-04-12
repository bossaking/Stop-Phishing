import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Statuses} from "../models/statuses";

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

  status : Statuses = Statuses.added;

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
