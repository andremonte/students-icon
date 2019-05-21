import { Students } from '../students/students.model';
import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../students/students.service';

@Component({
  selector: 'app-part2',
  templateUrl: './part2.component.html',
  styleUrls: ['./part2.component.css']
})
export class Part2Component implements OnInit {

  public students: Students[];
  public grades = [];
  constructor(private studentServ: StudentsService) { }

  ngOnInit() {
    this.studentServ.getAllStudents()
    .subscribe(data => {this.students = data.students; console.log(this.students)});
  }

  getAVG(){

    console.log(this.students[0].grades);
     /* console.log(this.students[0].grades) */
/*     for(let i = 0; i < this.students.length; i++) {
      console.log("$$$$$$$ " + this.students[i].grades);
      this.grades.push(this.students[i].grades);
    } */
/*     for(let i = 0; i < this.grades.length; i++) {
      console.log("GRADES "+ i + this.grades[0]);
    } */
  }
}
