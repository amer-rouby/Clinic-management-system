
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { coursesData } from '../../App-Data/coursesData';
import { Course } from '../../App-Data/types';
import { PageNotFoundComponent } from '../../page-no-found/page-no-found.component';

@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, PageNotFoundComponent],
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent implements OnInit {
    courses: any = coursesData;
    courseData!: Course;
    @Input() id: string = "";
    // constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        
        // اول طريقه
        // const courseId = this.activatedRoute.snapshot.paramMap.get("id");
        // this.courseData = this.courses[Number(courseId) - 1]

       // ثاني طريقه
        // this.activatedRoute.paramMap.subscribe((res: ParamMap) => {
        //     const courseId = Number(res.get("id"))
        //     this.courseData = this.getCourse(courseId)
        // })

        // ثالث طريقه
        if (this.id) {
            var corseId = Number(this.id)
            this.courseData = this.getCourse(corseId)
        }
    }

    private getCourse(courseId: number): Course {
        return this.courses.find((c: Course) => c.id === courseId)
    }
}