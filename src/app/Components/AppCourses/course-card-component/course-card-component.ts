import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../materail-ui/delete-confirm-dialog/confirm-dialog.component';
import { CourseService } from '../../../Services/course.service';
import { CategoryType } from '../../../Enums/category';
import { SharedMaterialModule } from '../../../../Shared/shared.material.module';
import { AddCourseComponent } from '../add-course/add-course.component'; // Import the AddCourseComponent if not imported already

@Component({
    selector: 'app-course-card-component',
    standalone: true,
    imports: [
        SharedMaterialModule,
        AddCourseComponent // Ensure AddCourseComponent is imported here if it wasn't already
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

    viewCourse(course: any): void {
        // Navigate to course view
        this.router.navigate(['course'], { queryParams: { id: course.id } });
    }

    editCourse(course: any): void {
        const dialogRef = this.dialog.open(AddCourseComponent, {
            width: '550px',
            height: "476px",
            data: course // Pass the course data to the dialog for editing
        });

        dialogRef.componentInstance.courseAdded.subscribe(() => {
            this.loadCourses.emit(); // Emit event to reload courses after edit
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
