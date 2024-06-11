import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { coursesData } from '../../App-Data/coursesData';
import { Course } from '../../App-Data/types';

@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent implements OnInit {
    courses: any = coursesData;
    courseData!: Course;
    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        const courseId = this.activatedRoute.snapshot.paramMap.get("id");
        this.courseData = this.courses[Number(courseId) - 1]
    }
}