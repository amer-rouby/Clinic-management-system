import { Injectable, inject } from '@angular/core';
import { Course } from '../Components/App-Data/types';
import { coursesData } from '../Components/App-Data/coursesData';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
    http = inject(HttpClient)
    constructor() { }
    getCourseList(): Course[] {
        return coursesData;
    }
}
