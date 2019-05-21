import { Students } from './../students/students.model';
import { StudentsService } from './../students/students.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component implements OnInit {

  students: Students[] = [];
  getstudentSub;
  filteredStudents: Students[];
  grades = [];
  gradesNum = [];
  constructor(private studentServ: StudentsService) { }

  ngOnInit() {
    try {
      this.getstudentSub = this.studentServ.getAllStudents()
        .subscribe(std => {
          { this.students = std.students; this.media(); console.log(this.students) }
          this.filteredStudents = std.students;
        })
    }
    catch (err) {
      throw err;
    }
  }

  ngOnDestroy() {
    this.getstudentSub.unsubscribe();
  }

  media() {
    for(let i = 0; i < this.students.length; i++) {
      this.grades[i] = 0;
      for(let z = 0; z < 8; z++) {
        this.grades[i] += Number(this.students[i].grades[z]);
        this.gradesNum[i] = parseFloat(this.grades[i]);
      }
    }
    for(let i = 0; i < this.gradesNum.length; i++) {
      this.gradesNum[i] = (this.gradesNum[i]/8);
      //console.log(this.gradesNum[i]);
    }
  }
}
/*   getAVG() {
    for (let i = 0; i < this.students.length; i++) {
      this.grades[i] = 0;
      for (let z = 0; z < 8; z++) {
        this.grades[i] += Number(this.students[i].grades[z]);
        var num = parseFloat(this.grades[i]);
      }
      this.gradesNum.push(num / 8);
      //console.log("SUM: " + this.gradesNum);
    }

  for (let i = 0; i < 25; i++) {
      this.gd[i] = this.gradesNum[i];
    }
    console.log("########################" + this.gd.length);
    for(let i = 0; i < this.grades.length; i++) {
      console.log(this.gd[0]);
    }
  } */
