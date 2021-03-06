import { Student } from './../students/student.model';
import { StudentsService } from './../students/students.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-part5',
  templateUrl: './part5.component.html',
  styleUrls: ['./part5.component.css']
})
export class Part5Component implements OnInit {
  students: Student[] = [];
  getstudentSub;
  filteredStudents: Student[];
  grades = [];
  gradesNum = [];
  filteredTags: Student[];

  constructor(private studentServ: StudentsService) { }

  ngOnInit() {
    try {
      this.getstudentSub = this.studentServ.getAllStudents()
        .subscribe(std => {
          { this.students = std.students; this.getAVG(); /*adicionei*/this.setOpenFalse(); /*console.log(this.students)*/ }
          this.filteredStudents = std.students;
          this.filteredTags = std.students;
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

   searchByTag(event: any) {
    this.filteredStudents = this.students.filter(value => {
    if (value.tags) {
      return value.tags[0].includes(event.target.value);
    }
    if(!event.target.value.length) return value;
    })
  }

  //adicionei
  setOpenFalse() {
    for (let i = 0; i < this.students.length; i++) {
      this.students[i].open = false;
    }
  }

  description(obj) {
    if (!obj.open) {
      obj.open = true;
    }
    else {
      obj.open = false;
    }
  }

  sendForm(f: NgForm, index_: number) {
    if (f.invalid) {
      return;
    }
    else {
      var str = f.value.inputTag;

      if (!this.students[index_].tags) {
        this.students[index_].tags = [];
        this.students[index_].tags.push(str);
      } else {
        this.students[index_].tags.push(str);
      }
    }
    f.reset();
  }

}
