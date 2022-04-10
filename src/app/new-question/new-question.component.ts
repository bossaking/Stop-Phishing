import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Course} from "../models/Course";
import {CourseService} from "../services/course.service";
import {NewAnswerComponent} from "../new-answer/new-answer.component";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  @Output() removeEvent = new EventEmitter();
  @ViewChild('answersContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;

  accept = "image/*";
  imagePath: string | ArrayBuffer | null = "";

  title = new FormControl('');
  rightAnswerCommunicate = new FormControl('');
  badAnswerCommunicate = new FormControl('');
  mainImage = new FormControl('');

  answers: any[];

  number : number | undefined;

  image : File | undefined;

  constructor(private courseService : CourseService, private factory: ComponentFactoryResolver) {
    this.answers = [];
  }

  ngOnInit(): void {
  }

  mainImageFileUpload($event:any) {
    let reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = (() => {
      this.image = $event.target.files[0];
    });
  }

  addNewAnswer(){
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

  onAnswerToggleChanged(componentRef: any){
    for (let answer of this.answers){
      if(answer != componentRef)
        answer.instance.isRight = false;
    }
  }

  remove(){
    this.removeEvent.emit();
  }

}
