import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from './themeService';

import { FormsModule } from '@angular/forms'; // Import FormsModule if you're using [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
        MatSelectModule
    ],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    selectedTheme!: string; // Declare selectedTheme property

    constructor(public themeService: ThemeService) { }
  
    changeThemeColor(color: string): void {
      this.selectedTheme = color; // Assign the selected color to selectedTheme
      this.themeService.setThemeColor(color);
    }
}
