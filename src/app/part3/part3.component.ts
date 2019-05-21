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
  filteredStudents: Students[];

  constructor(private studentServ: StudentsService) { }

  ngOnInit() {
    this.studentServ.getAllStudents()
    .subscribe(data => {this.students = data.students; console.log(this.students)});
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
