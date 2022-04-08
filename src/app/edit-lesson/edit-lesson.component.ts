import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  @Output() removeEvent = new EventEmitter<boolean>();

  readonly : boolean  = true;

  title = new FormControl('');
  description = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.title.setValue("LOL");
  }

  remove(){
    this.removeEvent.emit(true);
  }

  edit(){
    this.readonly = false;
  }
}
