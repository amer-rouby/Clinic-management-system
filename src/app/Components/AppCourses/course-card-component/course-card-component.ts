import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { PopupCourseCardComponent } from '../../../materail-ui/Description-dialog/popup-component';
import { CategoryType } from '../../App-Data/coursesData';
import { ConfirmDialogComponent } from '../../../materail-ui/delete-confirm-dialog/confirm-dialog.component';

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
    @Input() courses: any;
    @Input() index!: number;
    @Input() count!: number;
    @Output() ViowCourseEvent = new EventEmitter<any>();

    categoryType = CategoryType;

    constructor(public dialog: MatDialog, private router: Router) { }

    viwoCourse(course:any): void {
        this.router.navigate(['courses-details', course.id]);
    }

    openDialog() {
        this.dialog.open(PopupCourseCardComponent, {
            minWidth: '200px',
        });
    }

    deleteCourse(id: number) {
        const filteredCourses = this.courses.filter((item: any) => item.id !== id);
        this.ViowCourseEvent.emit(filteredCourses);
    }

    confirmDelete(courseId: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteCourse(courseId);
            }
        });
    }
}
