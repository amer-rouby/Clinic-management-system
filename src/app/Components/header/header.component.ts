import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from './themeService';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedMaterialModule } from '../../../Shared/modules/shared.material.module';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../Services/Auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedMaterialModule,
    RouterModule
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
export class HeaderComponent implements OnInit{
  selectedTheme: string | undefined;
  showThemesColor = false;
  currentLang: string;
  loadingData: boolean= false;
  showThemeSelector = false;
  themeColor: string = 'primary';
  constructor(
    public themeService: ThemeService, 
    private translate: TranslateService, 
    private authService: AuthService, 
    private router: Router, 


    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentLang = this.translate.currentLang || 'ar';
    this.updateDirection();
  }
  logout(): void {
    this.loadingData = true;
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
      this.loadingData = false;
    }, 500); 

  }
  changeThemeColor(color: string): void {
    this.selectedTheme = color;
    this.themeService.setThemeColor(color);
  }

  showThemes(): void {
    this.showThemeSelector = !this.showThemeSelector;
  }

  toggleLanguage(): void {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.loadingData = true;
    setTimeout(() => {
      this.translate.use(this.currentLang);
      localStorage.setItem('lang', this.currentLang);
      this.updateDirection();
      this.loadingData = false;
    }, 500); 
  }

  private updateDirection(): void {
    const dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.lang = this.currentLang;
    this.document.documentElement.dir = dir;
  }

  private themeSubscription!: Subscription;
  ngOnInit(): void {
    this.themeSubscription = this.themeService.themeColor$.subscribe(color => {
      this.themeColor = color;
  })}

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  getThemeColor(): any {
    return this.themeColor === 'primary' ? '#3f51b5' : '#e91e63'; 
  }
}
