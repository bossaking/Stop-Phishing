import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Statuses} from "../models/statuses";

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  @Output() removeEvent = new EventEmitter<boolean>();

  title = new FormControl('');
  description = new FormControl('');

  status : Statuses;

  constructor() {
    this.status = Statuses.added;
  }

  ngOnInit(): void {
  }

  remove(){
    this.removeEvent.emit(true);
  }
}
