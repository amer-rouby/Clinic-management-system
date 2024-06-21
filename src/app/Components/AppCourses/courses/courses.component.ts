import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CourseCardComponent } from '../course-card-component/course-card-component';
import { PageNotFoundComponent } from '../../page-no-found/page-no-found.component';
import { Course } from '../../App-Data/types';
import { CourseService } from '../../../services/course.service';
import { coursesData } from '../../App-Data/coursesData';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CommonModule, MatCardModule, MatInputModule, FormsModule, MatIconModule, MatPaginatorModule,
        CourseCardComponent, PageNotFoundComponent, MatProgressSpinnerModule
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

    courseService = inject(CourseService);

    ngOnInit(): void {
        this.loadCourses();
        this.applyFilter(this.searchTerm);
        //  this.addCourse();
    }

    addCourse() {
        coursesData.forEach(course => {
            this.courseService.addCourse(course).subscribe(response => {
                this.loadCourses();
            });
        });
    }

    onCourseClicked(updatedCourses: Course[]): void {
        this.courses = updatedCourses;
        this.applyFilter(this.searchTerm);
    }

    calculatePages(): void {
        this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize);
        this.updatePagedCourses();
    }

    updatePagedCourses(): void {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, this.filteredCourses.length);
        this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updatePagedCourses();
        }
    }

    prevPage(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updatePagedCourses();
        }
    }

    onPageChange(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex;
        this.updatePagedCourses();
    }

    applyFilter(description: string): void {
        this.loadingData = true
        this.courseService.searchCoursesByDescription(description).subscribe(results => {
            this.loadingData = false;
            this.filteredCourses = results;
            this.calculatePages();
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
                this.calculatePages();
            }
        });
    }
}
