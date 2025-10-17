import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Floor, CreateFloorDto, UpdateFloorDto } from '../models/floor.model';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private apiUrl = `${environment.apiBaseUrl}/floors`;
  private http = inject(HttpClient);

  /**
   * Get all floors, optionally filtered by building
   */
  getAll(buildingId?: number): Observable<Floor[]> {
    let params = new HttpParams();
    if (buildingId !== undefined) {
      params = params.set('buildingId', buildingId.toString());
    }
    return this.http.get<Floor[]>(this.apiUrl, { params });
  }

  /**
   * Get a single floor by ID
   */
  getById(id: number): Observable<Floor> {
    return this.http.get<Floor>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all floors in a specific building
   */
  getByBuildingId(buildingId: number): Observable<Floor[]> {
    return this.getAll(buildingId);
  }

  /**
   * Create a new floor
   */
  create(data: CreateFloorDto): Observable<Floor> {
    return this.http.post<Floor>(this.apiUrl, data);
  }

  /**
   * Update an existing floor
   */
  update(id: number, data: UpdateFloorDto): Observable<Floor> {
    return this.http.patch<Floor>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a floor
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
