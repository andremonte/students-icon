import { Students } from '../students/students.model';
import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../students/students.service';


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

  searchStd(event: any) {
    this.filteredStudents = this.students.filter((value) => {
      return value.firstName.toLowerCase().includes(event.target.value.toLowerCase())
        || value.lastName.toLowerCase().includes(event.target.value.toLowerCase());
    })
  }

  makeDarkLine() {
    var line = document.getElementById('dark');

    if (!line.className.match('dark')) {
      line.classList.add('dark');
    }
    else {
      line.classList.remove('dark');
    }
  }
  removeDarkLine() {
    var line = document.getElementById('dark');

    if (line.className.match('dark')) {
      line.classList.remove('dark');
    }
    else {
      line.classList.add('dark');
    }
  }


}
