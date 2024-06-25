import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { PopupCourseCardComponent } from '../../../materail-ui/Description-dialog/popup-component';

import { ConfirmDialogComponent } from '../../../materail-ui/delete-confirm-dialog/confirm-dialog.component';
import { CourseService } from '../../../Services/course.service';
import { CategoryType } from '../../../Enums/category';

@Component({
    selector: 'app-course-card-component',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: './course-card-component.html',
    styleUrls: ["./course-card.scss"]
})
export class CourseCardComponent {
    @Input() course: any;
    @Input() pagedCourses: any;
    @Input() index!: number;
    @Input() count!: number;
    @Output() loadCourses = new EventEmitter<any>();
    categoryType = CategoryType;

    constructor(public dialog: MatDialog, private router: Router,
        private courseService: CourseService) { }

    viwoCourse(course: any): void {
        // this.router.navigate(['course-list', course.id]);        
        this.router.navigate(['course'], { queryParams: { id: course.id, name: course.firstName } });
    }

    openDialog() {
        this.dialog.open(PopupCourseCardComponent, {
            minWidth: '200px',
        });
    }

    deleteCourse(id: string) {
        if (id || id.length) {
            this.courseService.deleteCourse(id).subscribe({
                next: () => this.loadCourses.emit(),
                error: (err) => console.error(err)
            });
        }
    }

    confirmDelete(courseId: string) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteCourse(courseId);
            }
        });
    }
}
