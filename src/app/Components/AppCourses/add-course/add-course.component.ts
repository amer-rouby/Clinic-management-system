import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from '../../../Services/course.service';
import { Course } from '../../../Models/courses';
import { SharedMaterialModule } from '../../../../Shared/modules/shared.material.module';


@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    SharedMaterialModule
  ],
  templateUrl: './add-course.component.html',
  styleUrls: ["./add-course.scss"]
})
export class AddCourseComponent implements OnInit {
  addCourseForm!: FormGroup;
  courseData: Course;
  Add_or_modify_button = "Add Course";

  @Output() courseAdded = new EventEmitter<Course>();

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    private fb: FormBuilder,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {
    this.courseData = { ...data };
  }

  ngOnInit(): void {
    const defaultImgUrl = '../../assets/images/';
    this.addCourseForm = this.fb.group({
      firstName: [this.courseData.firstName || '', Validators.required],
      lastName: [this.courseData.lastName || '', Validators.required],
      coursePrice: [this.courseData.coursePrice || null, [Validators.required, Validators.min(0)]],
      experienceInTheField: [this.courseData.experienceInTheField || null, [Validators.required, Validators.min(0)]],
      description: [this.courseData.description || '', Validators.required],
      category: [this.courseData.category || null, [Validators.required, Validators.min(0)]],
      imgUrl: [this.courseData.imgUrl || defaultImgUrl, Validators.required],
    });

    if (this.courseData.id) {
      this.Add_or_modify_button = "Edit Course";
    }
  }

  addCourse() {
    if (this.addCourseForm.valid) {
      const formData = { ...this.courseData, ...this.addCourseForm.value };

      if (this.courseData.id) {
        this.courseService.updateCourse(formData).subscribe({
          next: (response) => {
            this.courseAdded.emit(response);
            this.onClose();
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        this.courseService.addCourse(formData).subscribe({
          next: (response) => {
            this.courseAdded.emit(response);
            this.onClose();
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
