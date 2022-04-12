import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Lesson} from "../models/lesson";
import {Statuses} from "../models/statuses";

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

  status : Statuses;

  constructor() {
    this.status = Statuses.notChanged;
  }

  ngOnInit(): void {
    this.title.setValue(this.lesson?.title);
    this.description.setValue(this.lesson?.description);
  }

  remove(){
    this.status = Statuses.deleted;
    this.removeEvent.emit();
  }

  edit(){
    this.readonly = false;
    this.titleInput?.nativeElement.focus();
    this.status = Statuses.edited;
  }
}
