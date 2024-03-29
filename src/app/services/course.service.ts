import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {ToastrNotificationsService} from "./toastr-notifications.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Globals} from "../shared/globals";
import {catchError, map} from "rxjs/operators";
import {GetAllCoursesResponse} from "../models/GetAllCoursesResponse";
import {GetSingleCourseResponse} from "../models/getSingleCourseResponse";
import {Course} from "../models/Course";
import {SimpleCourse} from "../models/simpleCourse";
import {UpdateCourseRequest} from "../models/updateCourseRequest";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})
export class CourseService extends ToastrNotificationsService{

  constructor(private http: HttpClient, protected spinnerService:NgxSpinnerService, private appConfigService: AppConfigService) {
    super(spinnerService);
  }

  getAllCourses() : Observable<GetAllCoursesResponse>{
    this.spinnerService.show();
    return this.http.get(this.appConfigService.getConfig().apiURL + 'course/courses')
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

  getCourseById(params:any):Observable<Course>{
    this.spinnerService.show();
    return this.http.get(this.appConfigService.getConfig().apiURL + 'course/' + params)
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

  createCourse(data:SimpleCourse) : Observable<any>{
    this.spinnerService.show();
    return this.http.post(this.appConfigService.getConfig().apiURL + 'course/create', data)
      .pipe(
        map(
          () => {
            this.spinnerService.hide();
            return true;
          }
        ),
        catchError((err) => {
          this.showError(err);
          throwError(err);
          return of(false);
        })
      );
  }

  updateCourse(data:UpdateCourseRequest, id : string | undefined) : Observable<any>{
    this.spinnerService.show();
    return this.http.put(this.appConfigService.getConfig().apiURL + 'course/update/' + id, data)
      .pipe(
        map(
          () => {
            this.spinnerService.hide();
            return true;
          }
        ),
        catchError((err) => {
          this.showError(err);
          throwError(err);
          return of(false);
        })
      );
  }

  deleteCourse(id:string):Observable<any>{
    this.spinnerService.show();
    return this.http.delete(this.appConfigService.getConfig().apiURL + 'course/delete/' + id)
      .pipe(
        map(
          () =>{
            this.spinnerService.hide();
            return true;
          }
        ),
        catchError((err) =>{
          this.showError(err);
          throwError(err);
          return of(false);
        })
      );
  }
}
