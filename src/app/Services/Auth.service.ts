import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private restAPIURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private APIKey = "AIzaSyANnpk_nHIpG3QlcrGH1yP1RRxORd_6yj0";
  
  private signUpURL = `${this.restAPIURL}signUp?key=${this.APIKey}`;
  private signInURL = `${this.restAPIURL}signInWithPassword?key=${this.APIKey}`;

  constructor(private http: HttpClient) { }

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
    return this.post(this.signInURL, body, headers);
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setLoggedIn(value: boolean) {
    this.isAuthenticated = value;
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

