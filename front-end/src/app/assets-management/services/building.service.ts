import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Building, CreateBuildingDto, UpdateBuildingDto } from '../models/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiUrl = `${environment.apiBaseUrl}/buildings`;
  private http = inject(HttpClient);

  /**
   * Get all buildings, optionally filtered by branch
   */
  getAll(branchId?: number): Observable<Building[]> {
    let params = new HttpParams();
    if (branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    return this.http.get<Building[]>(this.apiUrl, { params });
  }

  /**
   * Get a single building by ID
   */
  getById(id: number): Observable<Building> {
    return this.http.get<Building>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all buildings in a specific branch
   */
  getByBranchId(branchId: number): Observable<Building[]> {
    return this.getAll(branchId);
  }

  /**
   * Create a new building
   */
  create(data: CreateBuildingDto): Observable<Building> {
    return this.http.post<Building>(this.apiUrl, data);
  }

  /**
   * Update an existing building
   */
  update(id: number, data: UpdateBuildingDto): Observable<Building> {
    return this.http.patch<Building>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a building
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
