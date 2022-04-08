import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {CourseService} from "../services/course.service";
import {NewLessonComponent} from "../new-lesson/new-lesson.component";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  lessons: any[];

  @ViewChild('lessonsContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;


  name = new FormControl('');
  title = new FormControl('');
  description = new FormControl('');

  constructor(private factory: ComponentFactoryResolver, private router: Router, private cDRef: ChangeDetectorRef, private courseService : CourseService) {
    this.lessons = [];
  }


  ngOnInit(): void {
  }

  addNewLesson() {
    const factory = this.factory.resolveComponentFactory(NewLessonComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.lessons.push(componentRef);
    componentRef?.instance.removeEvent.subscribe(() => {
      this.onLessonRemoved(componentRef)
    });
  }

  onLessonRemoved(componentRef: any) {
    this.lessons.splice(this.lessons.indexOf(componentRef), 1);
    console.log(this.lessons.length);
    componentRef.destroy();
  }

  save(){

  }

}
