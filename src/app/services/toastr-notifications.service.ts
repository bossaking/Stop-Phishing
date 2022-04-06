import { Injectable } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationsService {

  constructor(protected spinnerService : NgxSpinnerService) { }

  showError(err: any) {
    console.log(err);
    this.spinnerService.hide();
  }

  showSuccess(value: string){
    this.spinnerService.hide();
  }
}
