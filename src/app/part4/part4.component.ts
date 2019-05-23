import { StudentsService } from './../students/students.service';
import { Student } from './../students/student.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part4',
  templateUrl: './part4.component.html',
  styleUrls: ['./part4.component.css']
})
export class Part4Component implements OnInit {

  students: Student[] = [];
  getstudentSub;
  filteredStudents: Student[];
  grades = [];
  gradesNum = [];

  constructor(private studentServ: StudentsService) { }

  ngOnInit() {
    try {
      this.getstudentSub = this.studentServ.getAllStudents()
        .subscribe(std => {
          { this.students = std.students; this.getAVG(); /*adicionei*/this.setOpenFalse(); console.log(this.students) }
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

  //adicionei
  setOpenFalse() {
    for(let i = 0; i < this.students.length; i++) {
      this.students[i].open = false;
    }
  }

  description(obj){
    if(!obj.open) {
      obj.open = true;
    }
    else {
      obj.open = false;
    }
  }

  removeDarkLine() {
    var line = document.getElementById('dark');

    if(line.className.match('dark')) {
      line.classList.remove('dark');
    }
    else { line.classList.add('dark');
    }
  }
}
