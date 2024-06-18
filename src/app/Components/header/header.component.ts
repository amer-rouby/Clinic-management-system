import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from './themeService';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
        MatIconModule,
        MatMenuModule
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.scss'],
    animations: [
        trigger('themeToggle', [
            state('true', style({
                height: '*',
                opacity: 1,
            })),
            state('false', style({
                height: '0',
                opacity: 0,
                overflow: 'hidden'
            })),
            transition('false <=> true', animate('300ms ease-in-out'))
        ])
    ]
})
export class HeaderComponent {
    selectedTheme: string | undefined; // Declare selectedTheme property
    showThemesColor = false;

    constructor(public themeService: ThemeService) { }

    changeThemeColor(color: string): void {
        this.selectedTheme = color; // Assign the selected color to selectedTheme
        this.themeService.setThemeColor(color);
    }

    showThemes(): void {
        this.showThemesColor = !this.showThemesColor;
    }
}

