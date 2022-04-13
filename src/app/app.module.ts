import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AboutPhishingComponent} from './about-phishing/about-phishing.component';
import {RouterModule} from "@angular/router";
import {CourseComponent} from './course/course.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {CourseTheoryComponent} from './course-theory/course-theory.component';
import {LessonComponent} from './lesson/lesson.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import { NewCourseComponent } from './new-course/new-course.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NewTestComponent } from './new-test/new-test.component';
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatSelectModule} from "@angular/material/select";
import { NewQuestionComponent } from './new-question/new-question.component';
import { NewAnswerComponent } from './new-answer/new-answer.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './question/question.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { EditAnswerComponent } from './edit-answer/edit-answer.component';
import {AppConfigService} from "./services/app-config.service";

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutPhishingComponent,
    CourseComponent,
    CourseTheoryComponent,
    LessonComponent,
    DeleteDialogComponent,
    NewCourseComponent,
    NewLessonComponent,
    EditLessonComponent,
    EditCourseComponent,
    LoginComponent,
    LogoutComponent,
    NewTestComponent,
    NewQuestionComponent,
    NewAnswerComponent,
    TestComponent,
    QuestionComponent,
    EditTestComponent,
    EditQuestionComponent,
    EditAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AboutPhishingComponent
      },
      {
        path: 'about_phishing',
        component: AboutPhishingComponent
      },
      {
        path: 'course',
        component: CourseComponent
      },
      {
        path: 'course/:id',
        component: CourseTheoryComponent
      },
      {
        path: 'new-course',
        component: NewCourseComponent
      },
      {
        path: 'edit-course/:id',
        component: EditCourseComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'course/test/create',
        component: NewTestComponent
      },
      {
        path: 'course/:id/test',
        component: TestComponent
      },
      {
        path: 'course/edit-test/:id',
        component: EditTestComponent
      }
    ]),
    FlexLayoutModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
