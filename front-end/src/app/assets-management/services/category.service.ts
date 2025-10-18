import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiBaseUrl}/categories`;
  private http = inject(HttpClient);

  /**
   * Get all categories
   */
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  /**
   * Get a single category by ID
   */
  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new category
   */
  create(data: CreateCategoryDto): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, data);
  }

  /**
   * Update an existing category
   */
  update(id: number, data: UpdateCategoryDto): Observable<Category> {
    return this.http.patch<Category>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a category
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
