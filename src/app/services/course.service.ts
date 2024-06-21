import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Course } from '../Components/App-Data/types';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    http = inject(HttpClient);
    databaseURL = "https://angular-courses-796a0-default-rtdb.firebaseio.com"

    getAllCourses(): Observable<Course[]> {
        return this.http.get<{ [key: string]: any }>(`${this.databaseURL}/courses.json`).pipe(
            map(data => {
                if (data && Object.keys(data).length) {
                    return Object.keys(data).map(key => {
                        let course = data[key];
                        course.id = key;
                        // console.log(course);
                        return course;
                    });
                }
                return [];
            })
        );
    }

    addCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${this.databaseURL}/courses.json`, course);
    }

    deleteCourse(courseId: string): Observable<void> {
        return this.http.delete<void>(`${this.databaseURL}/courses/${courseId}.json`);
    }

    searchCoursesByDescription(description: string): Observable<Course[]> {
        return this.getAllCourses().pipe(
            map(courses => {
                return courses.filter(course => {
                    return course.description.toLowerCase().includes(description.toLowerCase());
                });
            })
        );
    }
}
