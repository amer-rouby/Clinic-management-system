import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { AppRoutes } from '../constants/app-routes';

export const routes: Routes = [
    { path: AppRoutes.HOME, canActivate: [AuthGuard], loadComponent: () => import('./Components/Dental-clinic/dental-clinic.component').then(m => m.DentalClinicComponent) },
    { path: AppRoutes.COURSE_LIST, canActivate: [AuthGuard], loadComponent: () => import('./Components/AppCourses/courses/courses.component').then(m => m.CoursesComponent) },
    { path: AppRoutes.COURSE, canActivate: [AuthGuard], loadComponent: () => import('./Components/AppCourses/course-details/course-details.component').then(m => m.CourseDetailsComponent) },
    { path: AppRoutes.COURSE_LIST_ID, canActivate: [AuthGuard], loadComponent: () => import('./Components/AppCourses/course-details/course-details.component').then(m => m.CourseDetailsComponent) },
    { path: AppRoutes.INSTALLMENTS, canActivate: [AuthGuard], loadComponent: () => import('./Components/patient-installments/patient-installments.component').then(m => m.PatientInstallmentsComponent) },
    { path: AppRoutes.LOGIN, loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: AppRoutes.REGISTER, loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
    { path: '', redirectTo: AppRoutes.LOGIN, pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./Components/page-no-found/page-no-found.component').then(m => m.PageNotFoundComponent) }
];

