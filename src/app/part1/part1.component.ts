import { Students } from './../students/students.model';
import { StudentsService } from './../students/students.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component implements OnInit {

  students: Students[];
  getstudentSub;
  private loadingError: boolean = false;
  filteredStudents: Students[];

  private grades = [];
  constructor(private studentServ: StudentsService) { }

  ngOnInit() {
    try {
      this.getstudentSub = this.studentServ.getAllStudents()
      .subscribe(std => {
        {this.students = std.students; console.log(this.students)}
        this.filteredStudents = std.students;
      })
    }
    catch (err) {
      this.loadingError = true;
    }
  }
    /* this.studentServ.getAllStudents()
    .subscribe(data => {this.students = data.students; console.log(this.students)}); */
    getAVG(){}
  }
