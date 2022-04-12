import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SimpleQuestion} from "../models/simpleQuestion";
import {FormControl} from "@angular/forms";
import {Globals} from "../shared/globals";
import {NewAnswerComponent} from "../new-answer/new-answer.component";
import {EditAnswerComponent} from "../edit-answer/edit-answer.component";
import {Statuses} from "../models/statuses";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit, AfterViewInit {

  @Input()
  question: SimpleQuestion | undefined;
  number: number | undefined;

  @Output()
  onExistedQuestionDeleted = new EventEmitter();

  @ViewChild('answersContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;

  readonly: boolean = true;


  title = new FormControl('');
  rightAnswerCommunicate = new FormControl('');
  badAnswerCommunicate = new FormControl('');
  mainImage = new FormControl('');

  accept = "image/*";
  image: File | undefined;
  noImage: boolean = true;

  answers: any[] = [];

  deletedAnswersIds : string[] = [];

  status : Statuses = Statuses.notChanged;

  constructor(private factory: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.title.setValue(this.question?.title);
    this.rightAnswerCommunicate.setValue(this.question?.rightAnswerCommunicate);
    this.badAnswerCommunicate.setValue(this.question?.badAnswerCommunicate);
    if (this.question?.image !== null) {
      // @ts-ignore
      this.question?.image = Globals.apiURL + this.question?.image;
    }
    this.noImage = this.question?.image === null;
  }

  ngAfterViewInit() {
    // @ts-ignore
    for (let answer of this.question?.answers) {
      this.addExistingAnswer(answer);
    }
    this.cdRef.detectChanges();
  }

  addExistingAnswer(answer: any) {
    const factory = this.factory.resolveComponentFactory(EditAnswerComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.answers.push(componentRef);
    // @ts-ignore
    componentRef?.instance.answer = answer;
    componentRef?.instance.removeExistedEvent.subscribe(() => {
      this.onExistedAnswerRemoved(componentRef)
    });
    componentRef?.instance.toggleChangedEvent.subscribe(() => {
      this.onAnswerToggleChanged(componentRef)
    });
  }

  addNewAnswer() {
    const factory = this.factory.resolveComponentFactory(NewAnswerComponent);
    const componentRef = this.vc?.createComponent(factory);
    this.answers.push(componentRef);
    componentRef?.instance.removeEvent.subscribe(() => {
      this.onAnswerRemoved(componentRef)
    });
    componentRef?.instance.toggleChangedEvent.subscribe(() => {
      this.onAnswerToggleChanged(componentRef)
    });
  }

  onAnswerRemoved(componentRef: any) {
    this.answers.splice(this.answers.indexOf(componentRef), 1);
    componentRef.destroy();
  }

  onExistedAnswerRemoved(componentRef: any) {
    this.answers.splice(this.answers.indexOf(componentRef), 1);
    this.deletedAnswersIds.push(componentRef.instance.answer.id);
    componentRef.destroy();
  }

  onAnswerToggleChanged(componentRef: any) {
    for (let answer of this.answers) {
      if (answer != componentRef) {
        answer.instance.isRight = false;
        answer.instance.readonly = false;
        answer.instance.status = Statuses.edited;
      }
    }
  }

  mainImageFileUpload($event: any) {
    let reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (() => {
      this.image = $event.target.files[0];
      this.noImage = true;
    });
  }

  remove() {
    this.onExistedQuestionDeleted.emit();
  }

  edit() {
    this.readonly = false;
    this.status = Statuses.edited;
  }

}
