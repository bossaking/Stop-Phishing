import { Component, OnInit } from '@angular/core';
import {CourseService} from "../services/course.service";
import {Course} from "../models/Course";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Course[] | undefined;

  constructor(private courseService : CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(response => {
      this.courses = response.courses;
    });
  }

}
