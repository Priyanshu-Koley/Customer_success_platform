import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, audit } from 'rxjs';
import { Project } from '../models/project.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projectsApiUrl = 'https://localhost:44347/api/app/project';
  private auditHistoryApiUrl = 'https://localhost:44347/api/app/audit-history';
  private versionHistoryApiUrl = 'https://localhost:44347/api/app/version-history';

  constructor(private http: HttpClient) {}

  // CRUD on Project

  createProject(project: Project): Observable<any> {
    return this.http.post<any>(this.projectsApiUrl, project);
  }
  getProjects(): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(this.projectsApiUrl);
  }
  updateProject(id: string, project: any): Observable<any> {
    const url = `${this.projectsApiUrl}/${id}`;
    return this.http.put<any>(url, project);
  }
  deleteProject(id: string): Observable<any> {
    const url = `${this.projectsApiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  // Audit History
  getAuditHistory(id: string): Observable<any> {
    const url = `${this.auditHistoryApiUrl}/audit-history-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createAuditHistory(auditHistory: any): Observable<any> {
    const url = `${this.auditHistoryApiUrl}/audit-history`;
    return this.http.post<any>(url, auditHistory);
  }
  updateAuditHistory(id: string, auditHistory: any): Observable<any> {
    const url = `${this.auditHistoryApiUrl}/${id}/audit-history`;
    return this.http.put<any>(url, auditHistory);
  }
  deleteAuditHistory(id: string): Observable<any> {
    const url = `${this.auditHistoryApiUrl}/${id}/audit-history`;
    return this.http.delete<any>(url);
  }

  // Version History
  getVersionHistory(id: string): Observable<any> {
    const url = `${this.versionHistoryApiUrl}/version-history-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createVersionHistory(versionHistory: any): Observable<any> {
    const url = `${this.versionHistoryApiUrl}/version-history`;
    return this.http.post<any>(url, versionHistory);
  }
  updateVersionHistory(id: string, versionHistory: any): Observable<any> {
    const url = `${this.versionHistoryApiUrl}/${id}/version-history`;
    return this.http.put<any>(url, versionHistory);
  }
  deleteVersionHistory(id: string): Observable<any> {
    const url = `${this.versionHistoryApiUrl}/${id}/version-history`;
    return this.http.delete<any>(url);
  }
}
