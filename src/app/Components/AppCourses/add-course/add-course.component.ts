import { MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../Services/course.service';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../../../Models/courses';

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
  styleUrls: ["./add-course.scss"]
})
export class AddCourseComponent {
  addCourseForm: FormGroup;

  @Output() courseAdded = new EventEmitter<Course>();

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
    this.addCourseForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.min(0)]],
      experienceInTheField: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: [null, [Validators.required, Validators.min(0)]],
      imgUrl: ['', Validators.required],
    });
  }

  addCourse() {
    if (this.addCourseForm.valid) {
      this.courseService.addCourse(this.addCourseForm.value).subscribe({
        next: (response) => {
          this.courseAdded.emit(response); // Emit the added course
          this.onClose();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
