import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Branch, CreateBranchDto, UpdateBranchDto } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = `${environment.apiBaseUrl}/branches`;
  private http = inject(HttpClient);

  /**
   * Get all branches
   */
  getAll(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl);
  }

  /**
   * Get a single branch by ID
   */
  getById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new branch
   */
  create(data: CreateBranchDto): Observable<Branch> {
    return this.http.post<Branch>(this.apiUrl, data);
  }

  /**
   * Update an existing branch
   */
  update(id: number, data: UpdateBranchDto): Observable<Branch> {
    return this.http.patch<Branch>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete a branch
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
