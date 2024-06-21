import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../App-Data/types';
import { PageNotFoundComponent } from '../../page-no-found/page-no-found.component';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule,
     MatCardModule, MatButtonModule, 
     PageNotFoundComponent,MatProgressSpinnerModule
    ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseData!: Course;
  @Input() id: string = "";
  loadingData: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        const courseId = params.get('id');
        return this.getCourse(courseId);
      })
    ).subscribe((course: Course | undefined) => {
      if (course) {
        this.loadingData = false;
        this.courseData = course;
      } else {
        // Handle course not found
      }
    });
  }

  private getCourse(courseId: string | null): Observable<Course | undefined> {
    this.loadingData = true;
    if (!courseId) {
        
      return new Observable(observer => observer.next(undefined)); 
    }
    
    return this.courseService.getAllCourses().pipe(
      map(courses => courses.find((c: Course) => c.id === courseId))
    );
   
  }
}
