import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  studentsUrl: string = "https://www.hatchways.io/api/assessment/students";

  constructor(private http: HttpClient) {}

  //casting observable into Students array
  getAllStudents(): Observable<{students: Student[]}> {
    return this.http.get<{students: Student[]}>(`${this.studentsUrl}`);
  }

}
