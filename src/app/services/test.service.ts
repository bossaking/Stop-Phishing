import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrNotificationsService} from "./toastr-notifications.service";
import {Observable, of, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Globals} from "../shared/globals";

@Injectable({
  providedIn: 'root'
})
export class TestService extends ToastrNotificationsService{

  constructor(private http: HttpClient, protected spinnerService:NgxSpinnerService) {
    super(spinnerService);
  }

  createTest(formData: FormData, id : string): Observable<any>{
    this.spinnerService.show();
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.post(Globals.apiURL + 'course/test/create/' + id, formData, {'headers':headers})
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

}
