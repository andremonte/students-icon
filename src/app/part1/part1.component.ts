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
    this.getAVG();
  }
  ngOnDestroy() {
    this.getstudentSub.unsubscribe();
  }
  getAVG() {
    for(let i = 0; i < this.students.length; i++) {
      console.log('quantidade de estudantes: '+ i);
      for(let z = 0; z < 7; z++) {
        console.log('Quantidade de notas: ' + z);
        /* this.grades[i] += this.students[i].grades[z]; */
      }
        /* console.log(this.grades[i]); */
    }
  }

  }
