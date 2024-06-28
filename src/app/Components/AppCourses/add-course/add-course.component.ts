import { Component, EventEmitter, Output } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Models/courses';
import { SharedMaterialModule } from '../../../../Shared/shared.material.module';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    SharedMaterialModule
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
