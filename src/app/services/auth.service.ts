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
import {LoginRequest} from "../models/LoginRequest";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ToastrNotificationsService{

  constructor(private http: HttpClient, protected spinnerService:NgxSpinnerService, private appConfigService: AppConfigService) {
    super(spinnerService);
  }

  logIn(data:LoginRequest) : Observable<any>{
    this.spinnerService.show();
    return this.http.post(this.appConfigService.getConfig().apiURL + 'auth/login', data)
      .pipe(
        map(
          () => {
            this.spinnerService.hide();
            localStorage.setItem('loggedIn_stop_phishing', 'true');
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

  logOut(){
    localStorage.removeItem('loggedIn_stop_phishing');
  }

  loggedIn() : boolean{
    return localStorage.getItem('loggedIn_stop_phishing') != null;
  }

}
