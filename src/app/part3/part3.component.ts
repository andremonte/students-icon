import { Students } from '../students/students.model';
import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../students/students.service';

@Component({
  selector: 'app-part3',
  templateUrl: './part3.component.html',
  styleUrls: ['./part3.component.css']
})
export class Part3Component implements OnInit {

  students: Students[];
  grades = [];
  getstudentSub;
  filteredStudents: Students[];

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
      throw err;
    }
  }

  /* getAVG(){
  } */

  searchStudent(event: any) {
    this.filteredStudents = this.students.filter((student) => {
      return student.firstName.toLowerCase().includes(event.target.value)
      || student.lastName.toLowerCase().includes(event.target.value);
    })
  }
/*   changeColor() {
    let color = document.getElementById('chngclr');
    color.style.color('red');
  } */
}
