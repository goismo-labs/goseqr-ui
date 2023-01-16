import { Injectable } from '@angular/core';
import {Platform} from "../models/platform.model";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { catchError, retry, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})

export class PlatformService {

  platformUrl = "http://127.0.0.1:8081/v1/platforms/"
  constructor(private http: HttpClient) { }


  getPlatforms(): Observable<Platform> {
    const req = this.http.get<Platform>(this.platformUrl).pipe(
      retry(3),
      catchError(this.handleError)
    )
    return req
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
