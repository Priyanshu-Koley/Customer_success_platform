import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsApiUrl = 'https://localhost:44347/api/app/project';

  constructor(private http: HttpClient) { }
  
  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.projectsApiUrl, project);
  }
  getProjects(): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(this.projectsApiUrl);
  }

  deleteProject(id: string): Observable<any> {
    const url = `${this.projectsApiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

}
