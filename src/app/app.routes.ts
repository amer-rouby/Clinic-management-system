import { Routes } from '@angular/router';

import { TodoComponent } from './Components/todo-list/todo-list.component';
import { CoursesComponent } from './Components/AppCourses/courses/courses.component';
import { PageNotFoundComponent } from './Components/page-no-found/page-no-found.component';
import { CourseDetailsComponent } from './Components/AppCourses/course-details/course-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './Guards/auth.guard';


export const routes: Routes = [
    { path: 'home', component: TodoComponent, canActivate: [AuthGuard] },
    { path: 'course-list', component: CoursesComponent , canActivate: [AuthGuard]},
    { path: 'course', component: CourseDetailsComponent, canActivate: [AuthGuard] },
    { path: 'course-list/:id', component: CourseDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
