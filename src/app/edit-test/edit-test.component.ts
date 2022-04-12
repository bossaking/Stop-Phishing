import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TestService} from "../services/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SingleTestResponse} from "../models/singleTestResponse";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {EditQuestionComponent} from "../edit-question/edit-question.component";
import {SimpleQuestion} from "../models/simpleQuestion";
import {Statuses} from "../models/statuses";

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {

  @ViewChild('questionsContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;

  constructor(private testService : TestService, private route : ActivatedRoute, private cDRef: ChangeDetectorRef, private factory: ComponentFactoryResolver, private router: Router) { }

  test : SingleTestResponse | undefined;

  questions : any[] = [];

  deletedQuestionsIds : string[] = [];

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.testService.getById(id).subscribe(result => {
      this.test = result;
      for(let question of this.test.questions){
        this.addExistingQuestions(question);
      }
    })
  }

  addExistingQuestions(question : SimpleQuestion){
    const factory = this.factory.resolveComponentFactory(EditQuestionComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.questions.push(componentRef);
    // @ts-ignore
    componentRef?.instance.question = question;
    // @ts-ignore
    componentRef?.instance.number = this.questions.indexOf(componentRef) + 1;
    componentRef?.instance.onExistedQuestionDeleted.subscribe(() => {
      this.onExistedQuestionDeleted(componentRef)
    });
  }

  addNewQuestion(){
    const factory = this.factory.resolveComponentFactory(NewQuestionComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.questions.push(componentRef);
    // @ts-ignore
    componentRef?.instance.number = this.questions.indexOf(componentRef) + 1;
    componentRef?.instance.removeEvent.subscribe(() => {
      this.onQuestionRemoved(componentRef)
    });
  }

  onQuestionRemoved(componentRef : any){
    this.questions.splice(this.questions.indexOf(componentRef), 1);
    componentRef.destroy();
    for(let ref of this.questions){
      // @ts-ignore
      ref?.instance.number = this.questions.indexOf(ref) + 1;
    }
  }

  onExistedQuestionDeleted(componentRef : any){
    this.questions.splice(this.questions.indexOf(componentRef), 1);
    this.deletedQuestionsIds.push(componentRef.instance.question.id);
    componentRef.destroy();
    for(let ref of this.questions){
      // @ts-ignore
      ref?.instance.number = this.questions.indexOf(ref) + 1;
    }
  }

  save(){
    let formData: FormData = new FormData();

    let testId: string = this.test!.id;

    //Dodajemy do formy wszystkie id pytań które trzeba usunąć
    for(let i = 0; i < this.deletedQuestionsIds.length; i++){
      formData.append(`deletedQuestions[${i}]`, this.deletedQuestionsIds[i]);
    }

    for (let i = 0; i < this.questions.length; i++) {

      let question = this.questions[i].instance;

      //Dodajemy do formy wszystkie id odpowiedzi które trzeba usunąć
      for(let j = 0; j < question.deletedAnswersIds.length; j++){
        formData.append(`deletedAnswers[${i}]`, question.deletedAnswersIds[i]);
      }



      if(question.status === Statuses.added){
        if (question.mainImage.value === "") {
          formData.append(`newQuestions[${i}].title`, question.title.value);
          formData.append(`newQuestions[${i}].imageNumber`, '');
          formData.append(`newQuestions[${i}].rightAnswerCommunicate`, question.rightAnswerCommunicate.value);
          formData.append(`newQuestions[${i}].badAnswerCommunicate`, question.badAnswerCommunicate.value);
        } else {
          formData.append(`newQuestions[${i}].title`, question.title.value);
          formData.append(`newQuestions[${i}].imageNumber`, i.toString());
          formData.append(`newQuestions[${i}].rightAnswerCommunicate`, question.rightAnswerCommunicate.value);
          formData.append(`newQuestions[${i}].badAnswerCommunicate`, question.badAnswerCommunicate.value);
          formData.append(`image`, question.image);
        }
      }else if(question.status === Statuses.edited){
        for(let j = 0; j < question.answers.length; j++){
          let answer = question.answers[i].instance;
          if(answer.status === Statuses.added){
            formData.append(`addedAnswers[${i}].questionId`, question.question.id);
            formData.append(`addedAnswers[${i}].title`, answer.title.value);
            formData.append(`addedAnswers[${i}].title`, answer.isRight);
          }
          else if(answer.status === Statuses.edited){
            formData.append(`editedAnswers[${i}].answerId`, answer.answer.id);
            formData.append(`editedAnswers[${i}].title`, answer.title.value);
            formData.append(`editedAnswers[${i}].title`, answer.isRight);
          }
        }
      }

    }

    // this.testService.updateTest(formData, testId).subscribe(result => {
    //   if(result){
    //     this.router.navigate(['/course']);
    //   }
    // });
  }
}
