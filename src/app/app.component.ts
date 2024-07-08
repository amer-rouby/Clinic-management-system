import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FirebaseService } from './Services/Firebase.service';
import { SharedMaterialModule } from '../Shared/modules/shared.material.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [FirebaseService],
    imports: [
        RouterOutlet,
        HeaderComponent,
        SharedMaterialModule
    ],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    translateService = inject(TranslateService);

    ngOnInit(): void {
        this.translateService.setDefaultLang('ar');
        this.translateService.use('ar');  // قم بتعيين اللغة التي تريد استخدامها
    }
}
