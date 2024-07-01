
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog} from '@angular/material/dialog';

import { CourseCardComponent } from '../course-card-component/course-card-component';
import { PageNotFoundComponent } from '../../page-no-found/page-no-found.component';
import { CourseService } from '../../../Services/course.service';
import { AddCourseComponent } from '../add-course/add-course.component';
import { Course } from '../../../Models/courses';
import { SharedMaterialModule } from '../../../../Shared/shared.material.module';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CourseCardComponent, 
        SharedMaterialModule,
        PageNotFoundComponent
    ],
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.scss']
})
export class CoursesComponent implements OnInit {

    courses: Course[] = [];
    pagedCourses: Course[] = [];
    filteredCourses: Course[] = [];

    loadingData: boolean = false;
    searchTerm: string = '';

    pageSize = 4;
    currentPage = 0;
    totalPages = 0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(public dialog: MatDialog, private courseService: CourseService) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddCourseComponent, {
            width: '550px',
            height: "476px"
        });

        dialogRef.componentInstance.courseAdded.subscribe(() => {
            this.loadCourses();
        });
    }

    ngOnInit(): void {
        this.loadCourses();
        this.applyFilter(this.searchTerm);
    }

    onCourseClicked(updatedCourses: Course[]): void {
        this.courses = updatedCourses;
        this.applyFilter(this.searchTerm);
    }

    updatePagedCourses(): void {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, this.filteredCourses.length);
        this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex);
    }

    onPageChange(event: PageEvent): void {
        if (event) {
            this.pageSize = event.pageSize;
            this.currentPage = event.pageIndex;
            this.updatePagedCourses();
        }
    }

    applyFilter(description: string): void {
        this.loadingData = true
        this.courseService.searchCoursesByDescription(description).subscribe(results => {
            this.loadingData = false;
            this.filteredCourses = results;
            this.updatePagedCourses();
        });
    }

    loadCourses(): void {
        this.loadingData = true
        this.courseService.getAllCourses().subscribe(courses => {
            if (courses && courses.length) {
                this.courses = courses.map(course => ({
                    ...course,
                    id: course.id // Assuming id is already present in each course object
                }));
                this.loadingData = false;
                this.filteredCourses = this.courses;
                this.updatePagedCourses(); // Update the paged courses
            }
        });
    }
}
