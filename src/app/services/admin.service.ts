import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GuestModel } from '../models/guestModel';
import { ADMIN_URL } from '../constants/appConstants';
import { GuestSearchModel } from '../models/guestSearchModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getGuests(): Observable<GuestModel[]> {
    return this.httpClient.get<GuestModel[]>(ADMIN_URL)
      .pipe(map(x => x), catchError(this.handleError));
  }

  searchGuests(seacrhModel: GuestSearchModel): Observable<GuestModel[]> {
    return this.httpClient.post<GuestModel[]>(ADMIN_URL, seacrhModel, this.httpOptions)
      .pipe(tap(_ => console.log('find guests')), map(x => x), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => msg);
  }
}
