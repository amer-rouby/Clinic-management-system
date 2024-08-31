import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private restAPIURL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private APIKey = environment.firebaseConfig.apiKey;
  
  private signUpURL = `${this.restAPIURL}signUp?key=${this.APIKey}`;
  private signInURL = `${this.restAPIURL}signInWithPassword?key=${this.APIKey}`;

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // متابعة حالة تسجيل الدخول
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  private post(url: string, body: any, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  signUp(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password, returnSecureToken: true };
    return this.post(this.signUpURL, body, headers);
  }
  
  signIn(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password, returnSecureToken: true };
    return this.post(this.signInURL, body, headers).pipe(
      tap(response => {
        this.setToken(response.idToken);
        this.isLoggedInSubject.next(true); // تحديث حالة تسجيل الدخول
        this.router.navigate(['/home']); // توجيه المستخدم إلى الشاشة الرئيسية بعد تسجيل الدخول
      })
    );
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    this.localStorageService.setItem('token', token);
  }

  getToken(): string | null {
    return this.localStorageService.getItem('token');
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.isLoggedInSubject.next(false); // تحديث حالة تسجيل الدخول بعد تسجيل الخروج
    this.router.navigate(['/login']); // توجيه المستخدم إلى شاشة تسجيل الدخول بعد تسجيل الخروج
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
