import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from './themeService';

import { FormsModule } from '@angular/forms'; // Import FormsModule if you're using [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatSelectModule,
        MatIconModule
    ],
    templateUrl: './header.component.html',
    styleUrl: "./header.scss"
})
export class HeaderComponent {
    selectedTheme!: any; // Declare selectedTheme property

    constructor(public themeService: ThemeService) { }
  
    changeThemeColor(color: string): void {
      this.selectedTheme = color; // Assign the selected color to selectedTheme
      this.themeService.setThemeColor(color);
    }
    showThemesColor:boolean = false;
    showThemes(): void {
        if (!this.showThemesColor) {
            this.showThemesColor = true;
        } else {
            this.showThemesColor = false;
        }

    }
}
