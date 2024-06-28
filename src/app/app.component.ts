import { SharedMaterialModule } from './../Shared/shared.material.module';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { FirebaseService } from './Services/Firebase.service';

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [FirebaseService],
    imports: [
        RouterOutlet,
        HeaderComponent,
        SharedMaterialModule,
        HttpClientModule
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {}