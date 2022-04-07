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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutPhishingComponent,
    CourseComponent,
    CourseTheoryComponent,
    LessonComponent
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
      }
    ]),
    FlexLayoutModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
