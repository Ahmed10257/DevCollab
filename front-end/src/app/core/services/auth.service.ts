import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  private http = inject(HttpClient)

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload);
  }
}
