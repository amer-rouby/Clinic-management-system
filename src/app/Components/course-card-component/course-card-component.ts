
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { PopupCourseCardComponent } from './popup-component';
import { CategoryType } from '../../AppComponent/coursesData';
import { ToastBasicDemo } from '../../toast-massedge/toast-massedge.component';
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
        ToastBasicDemo
    ],
    templateUrl: './course-card-component.html',
    styleUrls: ['../../../styles.scss']
})
export class CourseCardComponent {
    @Input() course: any;
    @Input() courses: any;
    @Input() index!: number;
    @Input() count!: number;
    @Output() ViowCourseEvent = new EventEmitter<any>();

    categoryType = CategoryType;
    showInput: boolean = false;
    titleButton: string = "Update Name";

    constructor(public dialog: MatDialog, private router: Router) { }

    viwoCourse(): void {
        const courseString = btoa(JSON.stringify(this.course));
        this.router.navigate(['courses-details', this.course.id, courseString]);
    }

    openDialog() {
        this.dialog.open(PopupCourseCardComponent, {
            minWidth: '200px',
        });
    }

    onKeyup(title: any): void {
        this.course.firstName = title;
    }

    updateName(): void {
        this.showInput = !this.showInput;
        this.titleButton = this.showInput ? "Name Updated" : "Update Name";
    }

    getCssClass(isClass: string, ...isClasses: any): string {
        return [isClass, ...isClasses].join(' ');
    }

    deleteCourse(id: number) {
        const filteredCourses = this.courses.filter((item: any) => item.id !== id);
        this.ViowCourseEvent.emit(filteredCourses);
    }
}
