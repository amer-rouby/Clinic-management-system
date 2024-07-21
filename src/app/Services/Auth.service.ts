import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private restAPIURL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private APIKey = environment.firebaseConfig.apiKey;
  
  private signUpURL = `${this.restAPIURL}signUp?key=${this.APIKey}`;
  private signInURL = `${this.restAPIURL}signInWithPassword?key=${this.APIKey}`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

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

  async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private generateRandomString(length: number = 128): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      randomString += randomChar;
    }
    return randomString;
  }

  testRandomString(): void {
    console.log(this.generateRandomString());
  }
}
