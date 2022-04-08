import {NgModule} from '@angular/core';
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
    EditCourseComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
