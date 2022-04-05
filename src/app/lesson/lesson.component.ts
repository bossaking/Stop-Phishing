import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  currentRotation = 0;

  constructor() { }

  ngOnInit(): void {
  }
  showContent(event:any, image:any){
    event.classList.toggle('expand');
    this.currentRotation += 180;
    image.style.transform = 'rotate(' + this.currentRotation + 'deg)';
  }
}
