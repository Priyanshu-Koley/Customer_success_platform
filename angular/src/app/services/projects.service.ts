import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projectsApiUrl = 'https://localhost:44347/api/app/project';
  private getAuditHistoryApiUrl = 'https://localhost:44347/api/app/audit-history/audit-history-by-project-id';
  private createAuditHistoryApiUrl = 'https://localhost:44347/api/app/audit-history/audit-history';

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
    const url = `${this.getAuditHistoryApiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  createAuditHistory(auditHistory: any): Observable<any> {
    return this.http.post<any>(this.createAuditHistoryApiUrl, auditHistory);
  }
}
