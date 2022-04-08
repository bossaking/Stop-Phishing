import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {NewLessonComponent} from "../new-lesson/new-lesson.component";
import {combineAll} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {SimpleCourse} from "../models/simpleCourse";
import {SimpleLesson} from "../models/simpleLesson";
import {CourseService} from "../services/course.service";

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements AfterViewInit {

  lessons: any[];

  @ViewChild('lessonsContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;


  name = new FormControl('');
  title = new FormControl('');
  description = new FormControl('');

  constructor(private factory: ComponentFactoryResolver, private router: Router, private cDRef: ChangeDetectorRef, private courseService : CourseService) {
    this.lessons = [];
  }

  ngAfterViewInit(){
    console.log(this.vc);
    this.addNewLesson();
    this.cDRef.detectChanges();
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

  create(){

    let lessons : SimpleLesson[] = [];

    for(let componentRef of this.lessons){
      lessons.push({
        title : componentRef.instance.title.value,
        description : componentRef.instance.description.value
      });
    }

    let simpleCourse : SimpleCourse = {
      name : this.name.value,
      title : this.title.value,
      description : this.description.value,
      lessons : lessons
    };
    this.courseService.createCourse(simpleCourse).subscribe((result) => {
      if(result){
        this.router.navigate(['/course']);
      }
    })
  }
}
