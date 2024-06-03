import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseCardComponent } from '../course-card-component/course-card-component';
import { coursesData } from '../../AppComponent/coursesData';
import { Course } from '../../AppComponent/types'; // Assuming you have a Course type defined

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, CommonModule],
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = []; // Use the Course type for better type safety

  ngOnInit(): void {
    this.courses = coursesData; // Load the courses data on initialization
  }

  onCourseClicked(updatedCourses: Course[]): void {
    this.courses = updatedCourses; // Update the courses array with the emitted event data
  }

  trackCourse(index: number, course: Course): number {
    return course.id; // Return the course ID for tracking purposes
  }
}
