import { Routes } from '@angular/router';

import { TodoComponent } from './Components/todo-list/todo-list.component';
import { CoursesComponent } from './Components/AppCourses/courses/courses.component';
import { PageNotFoundComponent } from './Components/page-no-found/page-no-found.component';
import { CourseDetailsComponent } from './Components/AppCourses/course-details/course-details.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    { path: 'home', component: TodoComponent },
    { path: 'course-list', component: CoursesComponent },
    { path: 'course', component: CourseDetailsComponent },//query Params
    { path: 'course-list/:id', component: CourseDetailsComponent },
    { path: 'auth', component: AuthComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
