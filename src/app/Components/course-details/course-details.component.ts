import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-course-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent implements OnInit {
    courseData: any = null;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        // const courseId = this.activatedRoute.snapshot.paramMap.get("id");
        const courseDataString = this.activatedRoute.snapshot.paramMap.get("course");

        if (courseDataString) {
            try {
                this.courseData = JSON.parse(atob(courseDataString));
            } catch (error) {
                this.courseData = null;
            }
        }
    }
}

