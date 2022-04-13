import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrNotificationsService} from "./toastr-notifications.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Globals} from "../shared/globals";
import {SingleTestResponse} from "../models/singleTestResponse";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})
export class TestService extends ToastrNotificationsService{

  constructor(private http: HttpClient, protected spinnerService:NgxSpinnerService, private appConfigService: AppConfigService) {
    super(spinnerService);
  }

  createTest(formData: FormData, id : string): Observable<any>{
    this.spinnerService.show();
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.post(this.appConfigService.getConfig().apiURL + 'course/test/create/' + id, formData, {'headers':headers})
      .pipe(map((result: any) => {
          this.spinnerService.hide();
          return true;
        }),
        catchError((err) => {
          this.showError(err.error);
          console.log(err);
          throwError(err);
          return of(false);
        })
      );
  }

  getByCourseId(courseId:any) : Observable<SingleTestResponse>{
    this.spinnerService.show();
    return this.http.get(this.appConfigService.getConfig().apiURL + 'course/test/' + courseId)
      .pipe(map((result: any) => {
          this.spinnerService.hide();
          return result;
        }),
        catchError((err) => {
          this.showError(err.error);
          console.log(err);
          return throwError(err);
        })
      );
  }

  getById(testId:any) : Observable<SingleTestResponse>{
    this.spinnerService.show();
    return this.http.get(this.appConfigService.getConfig().apiURL + 'course/test/test/' + testId)
      .pipe(map((result: any) => {
          this.spinnerService.hide();
          return result;
        }),
        catchError((err) => {
          this.showError(err.error);
          console.log(err);
          return throwError(err);
        })
      );
  }

  updateTest(formData: FormData, id : string): Observable<any>{
    this.spinnerService.show();
    return this.http.put(this.appConfigService.getConfig().apiURL + 'course/test/update/' + id, formData)
      .pipe(map((result: any) => {
          this.spinnerService.hide();
          return true;
        }),
        catchError((err) => {
          this.showError(err.error);
          console.log(err);
          throwError(err);
          return of(false);
        })
      );
  }

  deleteTest(id:string):Observable<any>{
    this.spinnerService.show();
    return this.http.delete(this.appConfigService.getConfig().apiURL + 'course/test/delete/' + id)
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
