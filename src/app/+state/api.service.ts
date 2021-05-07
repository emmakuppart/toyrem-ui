import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService extends HttpClient {
  private readonly baseUrl = '/toyrem-api';

  constructor(private httpHandler: HttpHandler) {
    super(httpHandler);
  }

  get<T>(url: string, options?): Observable<any> {
    return super.get<T>(this.baseUrl + url, options);
  }

  post<T>(url: string, options?): Observable<any> {
    return super.post<T>(this.baseUrl + url, options);
  }

  delete<T>(url: string): Observable<any> {
    return super.delete<T>(this.baseUrl + url);
  }

  put<T>(url: string, options?): Observable<any> {
    return super.put<T>(this.baseUrl + url, options);
  }
}