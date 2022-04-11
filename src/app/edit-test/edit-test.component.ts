import { Component, OnInit } from '@angular/core';
import {TestService} from "../services/test.service";
import {ActivatedRoute} from "@angular/router";
import {SingleTestResponse} from "../models/singleTestResponse";

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {

  constructor(private testService : TestService, private route : ActivatedRoute) { }

  test : SingleTestResponse | undefined;

  questions : any[] = [];

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.testService.getById(id).subscribe(result => {
      this.test = result;
    })
  }

  addNewQuestion(){

  }

  create(){

  }
}
