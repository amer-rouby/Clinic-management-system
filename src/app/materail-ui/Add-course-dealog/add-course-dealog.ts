// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { AddCourseComponent } from '../../Components/AppCourses/add-course/add-course.component';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   selector: 'app-add-course-dialog',
//   standalone: true,
//   imports: [MatIconModule],
//   template: `
//     <button class="btn btn-primary" (click)="openDialog()">
//         <mat-icon>add</mat-icon>
//     </button>
//   `,
// })
// export class AddCourseDialogComponent {
//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(AddCourseComponent, {
//       width: '800px',
//       height: "400px"
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//     });
//   }
// }