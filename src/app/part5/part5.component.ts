import { StudentsService } from './../students/students.service';
import { Students } from './../students/students.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-part5',
  templateUrl: './part5.component.html',
  styleUrls: ['./part5.component.css']
})
export class Part5Component implements OnInit {

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

  sendForm(f: NgForm) {
    if(f.invalid) {
      return
    }
    else {
    console.log(f.control.value);
    }
  }
  makeDarkLine() {
    var line = document.getElementById('dark');
    var line2 = document.getElementById('dark2');
    var line3 = document.getElementById('dark3');

    if(!line.className.match('dark')) {
      line.classList.add('dark');
    }
    else { line.classList.remove('dark'); }

     if(!line2.className.match('dark2')) {
      line2.classList.add('dark');
    }
    else { line2.classList.remove('dark'); }

    /*if(!line3.className.match('dark3')) {
      line3.classList.add('dark');
    }
    else { line3.classList.remove('dark') } */
  }

}

