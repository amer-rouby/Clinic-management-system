// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themeColor = new BehaviorSubject<string>('primary');

  themeColor$ = this._themeColor.asObservable();

  constructor() { }

  setThemeColor(color: string): void {
    this._themeColor.next(color);
  }
}
