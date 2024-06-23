import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { TodoComponent } from '../Components/todo-list/todo-list.component';
import { HeaderComponent } from '../Components/header/header.component';

@Component({
    selector: 'first-component',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        TodoComponent,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        HttpClientModule
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {}