import { Routes } from '@angular/router';

import { TodoComponent } from './Components/todo-list/todo-list.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { PageNotFoundComponent } from './page-no-found/page-no-found.component';
import { CourseDetailsComponent } from './Components/course-details/course-details.component';

export const routes: Routes = [
    { path: 'home', component: TodoComponent },
    { path: 'courses-list', component: CoursesComponent },
    { path: 'courses-details/:id/:course', component: CourseDetailsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
