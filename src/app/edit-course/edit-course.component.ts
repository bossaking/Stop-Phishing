import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../services/course.service";
import {NewLessonComponent} from "../new-lesson/new-lesson.component";
import {Course} from "../models/Course";
import {Lesson} from "../models/lesson";
import {EditLessonComponent} from "../edit-lesson/edit-lesson.component";
import {Statuses} from "../models/statuses";
import {SimpleLesson} from "../models/simpleLesson";
import {UpdateCourseRequest} from "../models/updateCourseRequest";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  editedLessons: Lesson[];
  deletedLessonsIds : string[];
  createdLessons: SimpleLesson[];

  lessonsComponents: any[];

  course: Course | undefined;

  @ViewChild('lessonsContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;


  name = new FormControl('');
  title = new FormControl('');
  description = new FormControl('');

  constructor(private factory: ComponentFactoryResolver, private router: Router, private cDRef: ChangeDetectorRef, private courseService: CourseService,
              private route: ActivatedRoute) {

    this.editedLessons = [];
    this.deletedLessonsIds = [];
    this.createdLessons = [];

    this.lessonsComponents = [];

    this.courseService.getCourseById(this.route.snapshot.paramMap.get('id')).subscribe(result => {
      this.course = result;

      this.name.setValue(this.course.name);
      this.title.setValue(this.course.title);
      this.description.setValue(this.course.description);
      for (let lesson of this.course.lessons) {
        this.addExistedLesson(lesson);
      }
    });

  }


  ngOnInit(): void {
  }

  addNewLesson() {
    const factory = this.factory.resolveComponentFactory(NewLessonComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.lessonsComponents.push(componentRef);
    componentRef?.instance.removeEvent.subscribe(() => {
      this.onLessonRemoved(componentRef)
    });
  }

  addExistedLesson(lesson: Lesson) {
    const factory = this.factory.resolveComponentFactory(EditLessonComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.lessonsComponents.push(componentRef);
    componentRef?.instance.removeEvent.subscribe(() => {
      this.onLessonRemoved(componentRef)
    });
    // @ts-ignore
    componentRef?.instance.lesson = lesson;
  }


  onLessonRemoved(componentRef: any) {
    this.lessonsComponents[this.lessonsComponents.indexOf(componentRef)].instance.status = Statuses.deleted;
    if(componentRef.instance.lesson != undefined)
    this.deletedLessonsIds.push(componentRef.instance.lesson?.id);
    this.lessonsComponents.splice(this.lessonsComponents.indexOf(componentRef), 1);
    componentRef.destroy();
  }

  save() {
    for(let component of this.lessonsComponents){
      switch (component.instance.status){
        case Statuses.added:
          this.createdLessons.push({
            title : component.instance.title.value,
            description : component.instance.description.value
          });
          break;
        case Statuses.edited:
          this.editedLessons.push({
            id : component.instance.lesson.id,
            title : component.instance.title.value,
            description : component.instance.description.value
          });
          break;
      }
    }

    let updateCourseRequest : UpdateCourseRequest = {
      title : this.title.value,
      name : this.name.value,
      description : this.description.value,
      createdLessons : this.createdLessons,
      updatedLessons : this.editedLessons,
      deletedLessonsIds : this.deletedLessonsIds
    };

    this.courseService.updateCourse(updateCourseRequest, this.course?.id).subscribe(result => {
      if(result){
        this.router.navigate(['/course/' + this.course?.id]);
      }
    });
  }

}
