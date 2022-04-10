import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CourseService} from "../services/course.service";
import {Course} from "../models/Course";
import {Router} from "@angular/router";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {TestService} from "../services/test.service";

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {

  courseId = new FormControl('');

  questions: any[];

  courses: Course[];

  @ViewChild('questionsContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;

  constructor(private factory: ComponentFactoryResolver, private router: Router, private cDRef: ChangeDetectorRef, private courseService: CourseService,
              private testService : TestService) {
    this.courses = [];
    this.questions = [];
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result.courses;
    })
  }


  addNewQuestion() {
    const factory = this.factory.resolveComponentFactory(NewQuestionComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.questions.push(componentRef);
    // @ts-ignore
    componentRef?.instance.number = this.questions.indexOf(componentRef) + 1;
    componentRef?.instance.removeEvent.subscribe(() => {
      this.onQuestionRemoved(componentRef)
    });
  }

  onQuestionRemoved(componentRef: any) {
    this.questions.splice(this.questions.indexOf(componentRef), 1);

    for (let question of this.questions) {
      question.instance.number = this.questions.indexOf(question) + 1;
    }

    componentRef.destroy();
  }

  create() {

    let formData: FormData = new FormData();

    let courseId: string = this.courseId.value;

    for (let i = 0; i < this.questions.length; i++) {

      let question = this.questions[i];

      if (question.instance.mainImage.value === "") {
        formData.append(`questions[${i}].title`, question.instance.title.value);
        formData.append(`questions[${i}].imageNumber`, '');
        formData.append(`questions[${i}].rightAnswerCommunicate`, question.instance.rightAnswerCommunicate.value);
        formData.append(`questions[${i}].badAnswerCommunicate`, question.instance.badAnswerCommunicate.value);
      } else {
        formData.append(`questions[${i}].title`, question.instance.title.value);
        formData.append(`questions[${i}].imageNumber`, i.toString());
        formData.append(`questions[${i}].rightAnswerCommunicate`, question.instance.rightAnswerCommunicate.value);
        formData.append(`questions[${i}].badAnswerCommunicate`, question.instance.badAnswerCommunicate.value);
        formData.append(`image`, question.instance.image);
      }


      for (let j = 0; j < question.instance.answers.length; j++) {
        let answer = question.instance.answers[j];

        formData.append(`questions[${i}].answers[${j}].title`, answer.instance.title.value);
        formData.append(`questions[${i}].answers[${j}].isRight`, answer.instance.isRight);
      }
    }

    this.testService.createTest(formData, courseId).subscribe(result => {
      if(result){
        this.router.navigate(['/course']);
      }
    });
  }
}
