import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/AppComponent/app.config';
import { AppComponent } from './app/AppComponent/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
