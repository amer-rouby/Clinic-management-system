import { Routes } from '@angular/router';

import { CoursesComponent } from './Components/AppCourses/courses/courses.component';
import { PageNotFoundComponent } from './Components/page-no-found/page-no-found.component';
import { CourseDetailsComponent } from './Components/AppCourses/course-details/course-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './Guards/auth.guard'; // تأكد من تعديل المسار إذا لزم الأمر
import { DentalClinicComponent } from './Components/Dental-clinic/dental-clinic.component';
import { PatientInstallmentsComponent } from './Components/patient-installments/patient-installments.component';

export const routes: Routes = [
    { path: 'home', component: DentalClinicComponent, canActivate: [authGuard] },
    { path: 'course-list', component: CoursesComponent, canActivate: [authGuard] },
    { path: 'course', component: CourseDetailsComponent, canActivate: [authGuard] },
    { path: 'course-list/:id', component: CourseDetailsComponent, canActivate: [authGuard] },
    
    { path: 'installments', component: PatientInstallmentsComponent, canActivate: [authGuard] },
    
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
