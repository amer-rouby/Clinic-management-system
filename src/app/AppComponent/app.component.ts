import { Component  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { TodoComponent } from '../Components/todo-list/todo-list.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Components/header/header.component';


@Component({
    selector: 'first-component',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, TodoComponent, MatButtonModule, MatDividerModule, MatIconModule],
    templateUrl: './app.component.html',
})

export class AppComponent {
    
}




