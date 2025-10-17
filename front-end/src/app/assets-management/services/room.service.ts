import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Room, CreateRoomDto, UpdateRoomDto } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = `${environment.apiBaseUrl}/rooms`;
  private http = inject(HttpClient);

  /**
   * Get all rooms, optionally filtered by floor
   */
  getAll(floorId?: number): Observable<Room[]> {
    let params = new HttpParams();
    if (floorId !== undefined) {
      params = params.set('floorId', floorId.toString());
    }
    return this.http.get<Room[]>(this.apiUrl, { params });
  }

  /**
   * Get a single room by ID
   */
  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get all rooms on a specific floor
   */
  getByFloorId(floorId: number): Observable<Room[]> {
    return this.getAll(floorId);
  }

  /**
   * Create a new room
   */
  create(data: CreateRoomDto): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, data);
  }

  /**
   * Update an existing room
   */
  update(id: number, data: UpdateRoomDto): Observable<Room> {
    return this.http.patch<Room>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a room
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
