import {Component, OnInit} from '@angular/core';
import {CourseService} from "../services/course.service";
import {Course} from "../models/Course";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-theory',
  templateUrl: './course-theory.component.html',
  styleUrls: ['./course-theory.component.css']
})
export class CourseTheoryComponent implements OnInit {

  course: Course | undefined;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(this.route.snapshot.paramMap.get('id')).subscribe(result => {
      this.course = result.course;
    });
  }

}
