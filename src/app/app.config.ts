import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient, HTTP_INTERCEPTORS, withFetch, HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environment/environment';
import { ErrorInterceptor } from '../Shared/Interceptors/error.interceptor';
import { AppTranslateModule } from '../Shared/modules/app-translate.module';
import { provideToastr } from 'ngx-toastr';
import { SuccessInterceptor } from '../Shared/Interceptors/Succes.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(),
        provideAnimationsAsync(),
        provideToastr(),

        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
            provideFirestore(() => getFirestore())
        ),
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: SuccessInterceptor, multi: true },
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(AppTranslateModule.forRoot())
    ]
};
