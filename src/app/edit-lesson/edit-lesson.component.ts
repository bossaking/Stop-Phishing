import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Lesson} from "../models/lesson";
import {LessonsStatuses} from "../models/lessonsStatuses";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  @Input()
  lesson : Lesson | undefined;

  @Output()
  removeEvent = new EventEmitter();

  @ViewChild('titleInput') titleInput : ElementRef | undefined;

  readonly : boolean  = true;

  title = new FormControl('');
  description = new FormControl('');

  status : LessonsStatuses;

  constructor() {
    this.status = LessonsStatuses.notChanged;
  }

  ngOnInit(): void {
    this.title.setValue(this.lesson?.title);
    this.description.setValue(this.lesson?.description);
  }

  remove(){
    this.status = LessonsStatuses.deleted;
    this.removeEvent.emit();
  }

  edit(){
    this.readonly = false;
    this.titleInput?.nativeElement.focus();
    this.status = LessonsStatuses.edited;
  }
}
