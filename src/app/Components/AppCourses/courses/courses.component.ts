import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CourseCardComponent } from '../course-card-component/course-card-component';
import { PageNotFoundComponent } from '../../page-no-found/page-no-found.component';
import { Course } from '../../App-Data/types';
import { CourseService } from '../../../services/course.service';
import { AddCourseComponent } from '../add-course/add-course.component';


@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CommonModule, MatCardModule, MatInputModule,
        FormsModule, MatIconModule, MatPaginatorModule,
        CourseCardComponent, PageNotFoundComponent,
        MatProgressSpinnerModule,
        MatDialogModule, MatToolbarModule
    ],
    templateUrl: './courses.component.html',
    styleUrl: "./courses.scss"
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
            width: '800px',
            height: "476px"
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    ngOnInit(): void {
        this.loadCourses();
        this.applyFilter(this.searchTerm);
        //  this.addCourse();
    }

    // addCourse() {
    //     coursesData.forEach(course => {
    //         this.courseService.addCourse(course).subscribe(response => {
    //             this.loadCourses();
    //         });
    //     });
    // }

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
            }
        });
    }
}
