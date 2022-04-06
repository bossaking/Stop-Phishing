import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ToastrNotificationsService} from "./toastr-notifications.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Globals} from "../shared/globals";
import {catchError, map} from "rxjs/operators";
import {GetAllCoursesResponse} from "../models/GetAllCoursesResponse";
import {GetSingleCourseResponse} from "../models/getSingleCourseResponse";

@Injectable({
  providedIn: 'root'
})
export class CourseService extends ToastrNotificationsService{

  constructor(private http: HttpClient, protected spinnerService:NgxSpinnerService) {
    super(spinnerService);
  }

  getAllCourses() : Observable<GetAllCoursesResponse>{
    this.spinnerService.show();
    return this.http.get(Globals.apiURL + 'course/courses')
      .pipe(
        map(
          (result: any) =>{
            this.spinnerService.hide();
            return result;
          }
        ),
        catchError((err) =>{
          this.showError(err);
          return throwError(err);
        })
      );
  }

  getCourseById(params:any):Observable<GetSingleCourseResponse>{
    this.spinnerService.show();
    return this.http.get(Globals.apiURL + 'course/' + params)
      .pipe(
        map(
          (result: any) =>{
            this.spinnerService.hide();
            return result;
          }
        ),
        catchError((err) =>{
          this.showError(err);
          return throwError(err);
        })
      );
  }
}
