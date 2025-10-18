import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Manufacturer, CreateManufacturerDto, UpdateManufacturerDto } from '../models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private apiUrl = `${environment.apiBaseUrl}/manufacturers`;
  private http = inject(HttpClient);

  /**
   * Get all manufacturers
   */
  getAll(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.apiUrl);
  }

  /**
   * Get a single manufacturer by ID
   */
  getById(id: number): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new manufacturer
   */
  create(data: CreateManufacturerDto): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(this.apiUrl, data);
  }

  /**
   * Update an existing manufacturer
   */
  update(id: number, data: UpdateManufacturerDto): Observable<Manufacturer> {
    return this.http.patch<Manufacturer>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a manufacturer
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
