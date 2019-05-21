import { StudentsService } from './../students/students.service';
import { Students } from './../students/students.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part4',
  templateUrl: './part4.component.html',
  styleUrls: ['./part4.component.css']
})
export class Part4Component implements OnInit {

  students: Students[];
  grades = [];
  filteredStudents: Students[];
  expand: boolean = false;

  constructor(private studentServ: StudentsService) { }

  ngOnInit() {
    this.studentServ.getAllStudents()
    .subscribe(data => {this.students = data.students; console.log(this.students)});
  }

  moreMinus() {
    if(!this.expand) {
      this.expand = true;
    }
    else {
      this.expand = false;
    }
  }

}
