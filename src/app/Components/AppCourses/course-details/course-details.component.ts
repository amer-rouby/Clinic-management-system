import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CourseService } from '../../../Services/course.service';
import { PageNotFoundComponent } from '../../page-no-found/page-no-found.component';
import { Course } from '../../../Models/courses';
import { SharedMaterialModule } from '../../../../Shared/modules/shared.material.module';

@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [
        PageNotFoundComponent,
        SharedMaterialModule
    ],
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent implements OnInit {
    courseData!: Course;
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
