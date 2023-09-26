import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reservationArea } from './reservationArea';
import { bookCourt } from './bookCourt';
import { bookCourtGet } from './bookCourtGet';
import { authGet } from './authGet';
import { auth } from './auth';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class reservationAreaService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getallAreas(): Observable<reservationArea[]> {
    return this.http.get<reservationArea[]>(`${this.apiServerUrl}/area/all`);
  }

  public addBook(book: bookCourt): Observable<bookCourt> {
    return this.http.post<bookCourt>(`${this.apiServerUrl}/book/add`, book);
  }

  public getallBook(): Observable<bookCourtGet[]> {
    return this.http.get<bookCourtGet[]>(`${this.apiServerUrl}/book/all`);
  }

  public deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/book/delete/${bookId}`);
  }

  public addAuth(auth: auth): Observable<auth> {
    return this.http.post<auth>(`${this.apiServerUrl}/auth/add`, auth);
  }

  public getallAuth(): Observable<authGet[]> {
    return this.http.get<authGet[]>(`${this.apiServerUrl}/auth/all`);
  }

  public updateBook(book: bookCourt): Observable<bookCourt> {
    return this.http.put<bookCourt>(`${this.apiServerUrl}/book/update`, book);
  }



}