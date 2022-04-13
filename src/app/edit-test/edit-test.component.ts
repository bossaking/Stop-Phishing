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

  constructor(private testService: TestService, private route: ActivatedRoute, private cDRef: ChangeDetectorRef, private factory: ComponentFactoryResolver, private router: Router) {
  }

  test: SingleTestResponse | undefined;

  existedQuestions: any[] = [];
  addedQuestions: any[] = [];

  deletedQuestionsIds: string[] = [];

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.testService.getById(id).subscribe(result => {
      this.test = result;
      for (let question of this.test.questions) {
        this.addExistingQuestions(question);
      }
    })
  }

  addExistingQuestions(question: SimpleQuestion) {
    const factory = this.factory.resolveComponentFactory(EditQuestionComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.existedQuestions.push(componentRef);
    // @ts-ignore
    componentRef?.instance.question = question;
    // @ts-ignore
    componentRef?.instance.number = this.existedQuestions.concat(this.addedQuestions).indexOf(componentRef) + 1;
    componentRef?.instance.onExistedQuestionDeleted.subscribe(() => {
      this.onExistedQuestionDeleted(componentRef)
    });
  }

  addNewQuestion() {
    const factory = this.factory.resolveComponentFactory(NewQuestionComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.addedQuestions.push(componentRef);
    // @ts-ignore
    componentRef?.instance.number = this.existedQuestions.concat(this.addedQuestions).indexOf(componentRef) + 1;
    componentRef?.instance.removeEvent.subscribe(() => {
      this.onQuestionRemoved(componentRef)
    });
  }

  onQuestionRemoved(componentRef: any) {
    this.addedQuestions.splice(this.addedQuestions.indexOf(componentRef), 1);
    componentRef.destroy();
    for (let ref of this.addedQuestions.concat(this.existedQuestions)) {
      // @ts-ignore
      ref?.instance.number = this.existedQuestions.concat(this.addedQuestions).indexOf(ref) + 1;
    }
  }

  onExistedQuestionDeleted(componentRef: any) {
    this.existedQuestions.splice(this.existedQuestions.indexOf(componentRef), 1);
    this.deletedQuestionsIds.push(componentRef.instance.question.id);
    componentRef.destroy();
    for (let ref of this.existedQuestions.concat(this.addedQuestions)) {
      // @ts-ignore
      ref?.instance.number = this.existedQuestions.concat(this.addedQuestions).indexOf(ref) + 1;
    }
  }

  save() {
    let formData: FormData = new FormData();

    let testId: string = this.test!.id;

    //Dodajemy do formy wszystkie id pytań które trzeba usunąć
    for (let i = 0; i < this.deletedQuestionsIds.length; i++) {
      formData.append(`deletedQuestions[${i}]`, this.deletedQuestionsIds[i]);
    }

    for (let i = 0; i < this.addedQuestions.length; i++) {
      let question = this.addedQuestions[i].instance;

      if (question.mainImage.value === "") {
        formData.append(`newQuestions[${i}].title`, question.title.value);
        formData.append(`newQuestions[${i}].imageName`, '');
        formData.append(`newQuestions[${i}].rightAnswerCommunicate`, question.rightAnswerCommunicate.value);
        formData.append(`newQuestions[${i}].badAnswerCommunicate`, question.badAnswerCommunicate.value);
      } else {
        formData.append(`newQuestions[${i}].title`, question.title.value);
        formData.append(`newQuestions[${i}].imageName`, question.image.name);
        formData.append(`newQuestions[${i}].rightAnswerCommunicate`, question.rightAnswerCommunicate.value);
        formData.append(`newQuestions[${i}].badAnswerCommunicate`, question.badAnswerCommunicate.value);
        formData.append(`images`, question.image);
      }

      for (let j = 0; j < question.answers.length; j++) {
        let answer = question.answers[j].instance;
        formData.append(`newQuestions[${i}].answers[${j}].title`, answer.title.value);
        formData.append(`newQuestions[${i}].answers[${j}].isRight`, answer.isRight);
      }
    }

    let questionIndex = 0;
    for (let i = 0; i < this.existedQuestions.length; i++) {

      let question = this.existedQuestions[i].instance;

      if (question.status === Statuses.edited) {

        //Dodajemy do formy wszystkie id odpowiedzi które trzeba usunąć
        for (let j = 0; j < question.deletedAnswersIds?.length; j++) {
          formData.append(`editedQuestions[${questionIndex}].deletedAnswers[${j}]`, question.deletedAnswersIds[j]);
        }

        let answerIndex = 0;
        for (let j = 0; j < question.existedAnswers.length; j++) {
          let answer = question.existedAnswers[j].instance;
          if (answer.status === Statuses.edited) {
            formData.append(`editedQuestions[${questionIndex}].editedAnswers[${answerIndex}].id`, answer.answer.id);
            formData.append(`editedQuestions[${questionIndex}].editedAnswers[${answerIndex}].title`, answer.title.value);
            formData.append(`editedQuestions[${questionIndex}].editedAnswers[${answerIndex}].isRight`, answer.isRight);
            answerIndex++;
          }
        }

        for (let j = 0; j < question.addedAnswers.length; j++) {
          let answer = question.addedAnswers[j].instance;
          formData.append(`editedQuestions[${questionIndex}].addedAnswers[${j}].title`, answer.title.value);
          formData.append(`editedQuestions[${questionIndex}].addedAnswers[${j}].isRight`, answer.isRight);
        }

        formData.append(`editedQuestions[${questionIndex}].id`, question.question.id);
        formData.append(`editedQuestions[${questionIndex}].title`, question.title.value);
        formData.append(`editedQuestions[${questionIndex}].rightAnswerCommunicate`, question.rightAnswerCommunicate.value);
        formData.append(`editedQuestions[${questionIndex}].badAnswerCommunicate`, question.badAnswerCommunicate.value);

        if (question.mainImage.value === "") {
          formData.append(`editedQuestions[${questionIndex}].imageName`, '');
        }else{
          formData.append(`editedQuestions[${questionIndex}].imageName`, question.image.name);
          formData.append(`images`, question.image);
        }
        questionIndex++;
      }

    }

    this.testService.updateTest(formData, testId).subscribe(result => {
      if (result) {
        this.router.navigate(['/course']);
      }
    });
  }
}
