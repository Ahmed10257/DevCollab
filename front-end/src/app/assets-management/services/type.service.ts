import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Type, CreateTypeDto, UpdateTypeDto } from '../models/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiUrl = `${environment.apiBaseUrl}/types`;
  private http = inject(HttpClient);

  /**
   * Get all types with optional category filter
   */
  getAll(categoryId?: number): Observable<Type[]> {
    let params = new HttpParams();
    if (categoryId) {
      params = params.set('categoryId', categoryId.toString());
    }
    return this.http.get<Type[]>(this.apiUrl, { params });
  }

  /**
   * Get a single type by ID
   */
  getById(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new type
   */
  create(data: CreateTypeDto): Observable<Type> {
    return this.http.post<Type>(this.apiUrl, data);
  }

  /**
   * Update an existing type
   */
  update(id: number, data: UpdateTypeDto): Observable<Type> {
    return this.http.patch<Type>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a type
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
