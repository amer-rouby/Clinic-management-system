import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FirebaseService } from './Services/Firebase.service';
import { SharedMaterialModule } from '../Shared/modules/shared.material.module';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

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
    document = inject(DOCUMENT);

    ngOnInit(): void {
        const lang = localStorage.getItem('lang') || 'ar';
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        this.translateService.setDefaultLang(lang);
        this.translateService.use(lang);  // Set the language to use
        this.document.documentElement.lang = lang;
        this.document.documentElement.dir = dir;
    }
}
