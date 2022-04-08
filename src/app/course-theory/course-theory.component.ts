import {Component, OnInit} from '@angular/core';
import {CourseService} from "../services/course.service";
import {Course} from "../models/Course";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-course-theory',
  templateUrl: './course-theory.component.html',
  styleUrls: ['./course-theory.component.css']
})
export class CourseTheoryComponent implements OnInit {

  course: Course | undefined;

  constructor(private courseService: CourseService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(this.route.snapshot.paramMap.get('id')).subscribe(result => {
      this.course = result;
    });
  }

  openRemoveDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.courseService.deleteCourse(this.course?.id!).subscribe((response: any) => {
          if(response == true){
            this.router.navigate(['/course']);
          }
        });
      }
      console.log(`Dialog result: ${result}`);
    });
  }

}
