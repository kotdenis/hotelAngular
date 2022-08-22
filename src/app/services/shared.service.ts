import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SHARED_URL } from '../constants/appConstants';
import { RoomModel } from '../models/roomModel';
import { SearchModel } from '../models/searchModel';
import { BookModel } from '../models/bookModel';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { } 

  getVacantRooms(): Observable<RoomModel[]> {
    return this.httpClient.get<RoomModel[]>(SHARED_URL + 'vacant')
      .pipe(tap(_ => console.log('got vacant')), map(x => x), catchError(this.handleError));
  }

  findRoom(searchModel: SearchModel): Observable<RoomModel[]> {
    return this.httpClient.post<RoomModel[]>(SHARED_URL + 'search', searchModel, this.httpOptions)
      .pipe(tap(_ => console.log('search room')), catchError(this.handleError));
  }

  bookRoom(bookModel: BookModel): Observable<boolean> {
    return this.httpClient.post<boolean>(SHARED_URL + 'book', bookModel, this.httpOptions)
    .pipe(tap(_ => console.log('book room')), catchError(this.handleError));
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
