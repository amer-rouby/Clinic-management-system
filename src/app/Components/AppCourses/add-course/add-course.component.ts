import { MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from './../../../services/course.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './add-course.component.html',
  styleUrl: "./add-course.scss"
})
export class AddCourseComponent {
  formData = {
    firstName: '',
    lastName: '',
    coursePrice: 0,
    experienceInTheField: '',
    description: '',
    category: 1,
    imgUrl: '',
  };
  @Output() loadCourses = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    private courseService: CourseService
  ) {}

  addCourse() {
    this.courseService.addCourse(this.formData).subscribe({
      next: (response) => {
        this.loadCourses.emit();
        console.log('Course added successfully:', response);
        this.onClose();
      },
      error: (error) => {
        console.error('Error adding course:', error);
      },
    });
  }

  onSubmit() {
    this.addCourse();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
