import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class FirebaseService {
  private databaseURL = "https://angular-courses-796a0-default-rtdb.firebaseio.com";
  
  private http = inject(HttpClient);

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.databaseURL}/${endpoint}.json`).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.databaseURL}/${endpoint}.json`, data).pipe(
      catchError(this.handleError)
    );
  }

  delete(endpoint: string): Observable<void> {
    return this.http.delete<void>(`${this.databaseURL}/${endpoint}.json`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
