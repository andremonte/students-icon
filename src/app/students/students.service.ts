import { Injectable } from '@angular/core';
import { Students } from './students.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  studentsUrl: string = "https://www.hatchways.io/api/assessment/students";

  constructor(private http: HttpClient) {}

  //casting observable into Students array
  getAllStudents(): Observable<{students: Students[]}> {
    return this.http.get<{students: Students[]}>(`${this.studentsUrl}`);
  }

}
