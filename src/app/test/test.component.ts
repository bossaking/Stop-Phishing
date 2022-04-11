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
import {Globals} from "../shared/globals";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {QuestionComponent} from "../question/question.component";
import {AuthService} from "../services/auth.service";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  test : SingleTestResponse | undefined;

  @ViewChild('questionContainer', {read: ViewContainerRef}) vc: ViewContainerRef | undefined;

  questions : any[]  = [];
  questionNumber : number = 1;
  firstQuestion : boolean = true;
  lastQuestion : boolean = false;

  question : QuestionComponent | undefined;

  constructor(private testService: TestService, private route:ActivatedRoute, private cDRef: ChangeDetectorRef, private factory: ComponentFactoryResolver,
              private router : Router, public authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    this.testService.getByCourseId(courseId).subscribe(result => {
      this.test = result;
      for(let question of this.test.questions){
        question.image = Globals.apiURL + question.image;
      }
      this.selectQuestion();
    });

  }

  selectQuestion(){
    let index = this.questionNumber;
    const factory = this.factory.resolveComponentFactory(QuestionComponent);
    this.vc?.clear();
    const componentRef = this.vc?.createComponent(factory);
    // @ts-ignore
    componentRef?.instance.question = this.test?.questions[index - 1];
    this.question = componentRef?.instance;

    this.firstQuestion = this.questionNumber === 1;
    this.lastQuestion = this.questionNumber === this.test?.questions.length;
  }

  redo(){
    if(!this.question?.answered) return;
    if(this.lastQuestion){
      this.router.navigate(['/course']);
    }else{
      this.questionNumber += 1;
      this.selectQuestion();
    }
  }

  undo(){
    if(this.firstQuestion){
      this.router.navigate(['/course/' + this.route.snapshot.paramMap.get('id')]);
    }else{
      this.questionNumber -= 1;
      this.selectQuestion();
    }
  }

  openRemoveDialog(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.testService.deleteTest(this.test?.id!).subscribe((response: any) => {
          if(response == true){
            this.router.navigate(['/course']);
          }
        });
      }
    });
  }



}
