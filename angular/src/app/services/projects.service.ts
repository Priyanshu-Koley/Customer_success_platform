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
  private versionHistoryApiUrl =
    'https://localhost:44347/api/app/version-history';
  private budgetApiUrl = 'https://localhost:44347/api/app/project-budget';
  private stackApiUrl = 'https://localhost:44347/api/app/project-scope-stack';
  private stakeholderApiUrl = 'https://localhost:44347/api/app/stakeholders';
  private riskApiUrl = 'https://localhost:44347/api/app/risk-profile';
  private phaseApiUrl = 'https://localhost:44347/api/app/phase-milestone';
  private sprintApiUrl = 'https://localhost:44347/api/app/sprint';
  private escalationApiUrl =
    'https://localhost:44347/api/app/escalation-matrix';

  constructor(private http: HttpClient) {}

  // CRUD on Project

  createProject(project: Project): Observable<any> {
    return this.http.post<any>(this.projectsApiUrl, project);
  }
  getProjects(): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(this.projectsApiUrl);
  }
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectsApiUrl}/${id}`);
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

  // Project Budget
  getBudget(id: string): Observable<any> {
    const url = `${this.budgetApiUrl}/project-budget-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createBudget(budget: any): Observable<any> {
    const url = `${this.budgetApiUrl}/project-budget`;
    return this.http.post<any>(url, budget);
  }
  updateBudget(id: string, budget: any): Observable<any> {
    const url = `${this.budgetApiUrl}/${id}/project-budget`;
    return this.http.put<any>(url, budget);
  }
  deleteBudget(id: string): Observable<any> {
    const url = `${this.budgetApiUrl}/${id}/project-budget`;
    return this.http.delete<any>(url);
  }

  // Project Scope and stack
  getStack(id: string): Observable<any> {
    const url = `${this.stackApiUrl}/project-scope-stack-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createStack(budget: any): Observable<any> {
    const url = `${this.stackApiUrl}/project-scope-stack`;
    return this.http.post<any>(url, budget);
  }
  updateStack(id: string, budget: any): Observable<any> {
    const url = `${this.stackApiUrl}/${id}/project-scope-stack`;
    return this.http.put<any>(url, budget);
  }
  deleteStack(id: string): Observable<any> {
    const url = `${this.stackApiUrl}/${id}/project-scope-stack`;
    return this.http.delete<any>(url);
  }

  // Project Stakeholders
  getStakeholders(id: string): Observable<any> {
    const url = `${this.stakeholderApiUrl}/stakeholders-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createStakeholder(stakeholder: any): Observable<any> {
    const url = `${this.stakeholderApiUrl}/stakeholders`;
    return this.http.post<any>(url, stakeholder);
  }
  updateStakeholder(id: string, stakeholder: any): Observable<any> {
    const url = `${this.stakeholderApiUrl}/${id}/stakeholders`;
    return this.http.put<any>(url, stakeholder);
  }
  deleteStakeholder(id: string): Observable<any> {
    const url = `${this.stakeholderApiUrl}/${id}/stakeholders`;
    return this.http.delete<any>(url);
  }

  // Risk Profile
  getRisks(id: string): Observable<any> {
    const url = `${this.riskApiUrl}/risk-profile-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createRisk(risk: any): Observable<any> {
    const url = `${this.riskApiUrl}/risk-profile`;
    return this.http.post<any>(url, risk);
  }
  updateRisk(id: string, risk: any): Observable<any> {
    const url = `${this.riskApiUrl}/${id}/risk-profile`;
    return this.http.put<any>(url, risk);
  }
  deleteRisk(id: string): Observable<any> {
    const url = `${this.riskApiUrl}/${id}/risk-profile`;
    return this.http.delete<any>(url);
  }

  // Phases & MIlestones
  getPhases(id: string): Observable<any> {
    const url = `${this.phaseApiUrl}/phase-milestone-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createPhase(phase: any): Observable<any> {
    const url = `${this.phaseApiUrl}/phase-milestone`;
    return this.http.post<any>(url, phase);
  }
  updatePhase(id: string, phase: any): Observable<any> {
    const url = `${this.phaseApiUrl}/${id}/phase-milestone`;
    return this.http.put<any>(url, phase);
  }
  deletePhase(id: string): Observable<any> {
    const url = `${this.phaseApiUrl}/${id}/phase-milestone`;
    return this.http.delete<any>(url);
  }

  // Sprint wise details
  getSprints(id: string): Observable<any> {
    const url = `${this.sprintApiUrl}/sprint-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createSprint(sprint: any): Observable<any> {
    const url = `${this.sprintApiUrl}/sprint`;
    return this.http.post<any>(url, sprint);
  }
  updateSprint(id: string, sprint: any): Observable<any> {
    const url = `${this.sprintApiUrl}/${id}/sprint`;
    return this.http.put<any>(url, sprint);
  }
  deleteSprint(id: string): Observable<any> {
    const url = `${this.sprintApiUrl}/${id}/sprint`;
    return this.http.delete<any>(url);
  }

  // Escalation Matrix
  getEscalations(id: string): Observable<any> {
    const url = `${this.escalationApiUrl}/escalation-matrix-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createEscalation(escalation: any): Observable<any> {
    const url = `${this.escalationApiUrl}/escalation-matrix`;
    return this.http.post<any>(url, escalation);
  }
  updateEscalation(id: string, escalation: any): Observable<any> {
    const url = `${this.escalationApiUrl}/${id}/escalation-matrix`;
    return this.http.put<any>(url, escalation);
  }
  deleteEscalation(id: string): Observable<any> {
    const url = `${this.escalationApiUrl}/${id}/escalation-matrix`;
    return this.http.delete<any>(url);
  }
}
