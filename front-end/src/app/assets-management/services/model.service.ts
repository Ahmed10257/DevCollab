import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Model, CreateModelDto, UpdateModelDto } from '../models/model.model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private apiUrl = `${environment.apiBaseUrl}/models`;
  private http = inject(HttpClient);

  /**
   * Get all models, optionally filtered by manufacturer
   */
  getAll(manufacturerId?: number): Observable<Model[]> {
    let params = new HttpParams();
    if (manufacturerId) {
      params = params.set('manufacturerId', manufacturerId.toString());
    }
    return this.http.get<Model[]>(this.apiUrl, { params });
  }

  /**
   * Get a single model by ID
   */
  getById(id: number): Observable<Model> {
    return this.http.get<Model>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new model
   */
  create(data: CreateModelDto): Observable<Model> {
    return this.http.post<Model>(this.apiUrl, data);
  }

  /**
   * Update an existing model
   */
  update(id: number, data: UpdateModelDto): Observable<Model> {
    return this.http.patch<Model>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a model
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
