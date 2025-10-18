import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Asset, CreateAssetDto, UpdateAssetDto, AssetFilter } from '../models/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = `${environment.apiBaseUrl}/assets`;
  private http = inject(HttpClient);

  /**
   * Get all assets with optional filters
   */
  getAll(filter?: AssetFilter): Observable<Asset[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.categoryId) {
        params = params.set('categoryId', filter.categoryId.toString());
      }
      if (filter.typeId) {
        params = params.set('typeId', filter.typeId.toString());
      }
      if (filter.branchId) {
        params = params.set('branchId', filter.branchId.toString());
      }
      if (filter.buildingId) {
        params = params.set('buildingId', filter.buildingId.toString());
      }
      if (filter.floorId) {
        params = params.set('floorId', filter.floorId.toString());
      }
      if (filter.roomId) {
        params = params.set('roomId', filter.roomId.toString());
      }
      if (filter.status) {
        params = params.set('status', filter.status);
      }
      if (filter.assignedUserId) {
        params = params.set('assignedUserId', filter.assignedUserId.toString());
      }
      if (filter.responsibleUserId) {
        params = params.set('responsibleUserId', filter.responsibleUserId.toString());
      }
      if (filter.searchTerm) {
        params = params.set('searchTerm', filter.searchTerm);
      }
    }
    
    return this.http.get<Asset[]>(this.apiUrl, { params });
  }

  /**
   * Get a single asset by ID
   */
  getById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new asset
   */
  create(data: CreateAssetDto): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, data);
  }

  /**
   * Update an existing asset
   */
  update(id: number, data: UpdateAssetDto): Observable<Asset> {
    return this.http.patch<Asset>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete an asset
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
