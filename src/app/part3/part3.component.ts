import { Students } from '../students/students.model';
import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../students/students.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-part3',
  templateUrl: './part3.component.html',
  styleUrls: ['./part3.component.css']
})
export class Part3Component implements OnInit {

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
          { this.students = std.students; this.getAVG(); /*console.log(this.students)*/ }
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

  getAVG() {
    for (let i = 0; i < this.students.length; i++) {
      this.grades[i] = 0;
      for (let z = 0; z < 8; z++) {
        this.grades[i] += Number(this.students[i].grades[z]);
        this.gradesNum[i] = parseFloat(this.grades[i]);
      }
    }
    for (let i = 0; i < this.gradesNum.length; i++) {
      this.gradesNum[i] = (this.gradesNum[i] / 8);
    }
  }

  procura(event: any) {
    this.filteredStudents = this.students.filter(function(value) {
      return value.firstName.toLowerCase===event.target.value;
    })
    console.log('QUANTITY: ' + this.filteredStudents.length);
  }

  searchStudent(event: any) {
    alert(event);
    this.filteredStudents = this.students.filter((stu) => {
      return stu.firstName.toLowerCase().includes(event.target.value)
        || stu.lastName.toLowerCase().includes(event.target.value);
    })
  }

}
