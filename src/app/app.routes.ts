import { Routes } from '@angular/router';

import { TodoComponent } from './Components/todo-list/todo-list.component';
import { CoursesComponent } from './Components/AppCourses/courses/courses.component';
import { PageNotFoundComponent } from './Components/page-no-found/page-no-found.component';
import { CourseDetailsComponent } from './Components/AppCourses/course-details/course-details.component';
import { AcountComponent } from './acount/acount.component';
import { LoginComponent } from './acount/login/login.component';
import { RegisterComponent } from './acount/register/register.component';

export const routes: Routes = [
    { path: 'home', component: TodoComponent },
    { path: 'course-list', component: CoursesComponent },
    { path: 'course', component: CourseDetailsComponent },//query Params
    { path: 'course-list/:id', component: CourseDetailsComponent },
    { path: 'acount', component: AcountComponent,
        children: [
            {path:"login", component: LoginComponent},
            {path:"register", component: RegisterComponent},
            { path: '', redirectTo: '/acount/login', pathMatch: 'full' },
        ]
     },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
