
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
//material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'; 
import { CourseCardComponent } from '../course-card-component/course-card-component';
import { PageNotFoundComponent } from '../../page-no-found/page-no-found.component';
//data type
import { Course } from '../../App-Data/types';
//services
import { CourseService } from '../../../services/course.service';
@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        MatPaginatorModule,CourseCardComponent, CommonModule,
        MatCardModule,MatInputModule,FormsModule,MatIconModule,
        PageNotFoundComponent
    ],
    templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {

    courses: Course[] = [];
    pagedCourses: Course[] = [];
    filteredCourses: Course[] = [];
    searchTerm: string = '';
    pageSize = 4;
    currentPage = 1;
    totalPages = 1;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    // constructor(private coursService: CoursService) { }
    private coursService=  inject(CourseService)

    ngOnInit(): void {
        this.courses = this.coursService.getCourseList();
        this.applyFilter();
    }

    onCourseClicked(updatedCourses: Course[]): void {
        this.courses = updatedCourses;
        this.applyFilter();
    }

    calculatePages(): void {
        this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize); // استخدام الكورسات المصفاة بدلاً من الكورسات الأصلية
        this.updatePagedCourses();
    }

    updatePagedCourses(): void {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize, this.filteredCourses.length);
        this.pagedCourses = this.filteredCourses.slice(startIndex, endIndex);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagedCourses();
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagedCourses();
        }
    }

    onPageChange(event: PageEvent): void {
        this.pageSize = event.pageSize;
        this.currentPage = event.pageIndex + 1;
        this.updatePagedCourses();
    }

    applyFilter(): void {
        const filterValue = this.searchTerm.trim().toLowerCase();
        this.filteredCourses = this.courses.filter((course: any) => course.description.toLowerCase().includes(filterValue));
        this.calculatePages();
    }
}



