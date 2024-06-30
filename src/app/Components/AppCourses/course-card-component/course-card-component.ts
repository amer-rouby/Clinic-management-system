import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupCourseCardComponent } from '../../../materail-ui/Description-dialog/popup-component';

import { ConfirmDialogComponent } from '../../../materail-ui/delete-confirm-dialog/confirm-dialog.component';
import { CourseService } from '../../../Services/course.service';
import { CategoryType } from '../../../Enums/category';
import { SharedMaterialModule } from '../../../../Shared/shared.material.module';

@Component({
    selector: 'app-course-card-component',
    standalone: true,
    imports: [
        SharedMaterialModule
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
        this.router.navigate(['course'], { queryParams: { id: course.id} });
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
