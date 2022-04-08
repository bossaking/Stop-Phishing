import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  @Output() removeEvent = new EventEmitter<boolean>();

  title = new FormControl('');
  description = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  remove(){
    this.removeEvent.emit(true);
  }
}
