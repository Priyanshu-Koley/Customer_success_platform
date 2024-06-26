import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, audit } from 'rxjs';
import { Project } from '../models/project.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private PORT = 44347;
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // CRUD on Project

  createProject(project: Project): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/project`, project);
  }
  getProjects(): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(`${this.apiUrl}/project`);
  }
  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/${id}`);
  }
  getProjectByProjectManagerId(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/project/projects-by-project-manager/${id}`
    );
  }
  getProjectByClientId(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/project/projects-by-client/${id}`
    );
  }
  updateProject(id: string, project: any): Observable<any> {
    const url = `${this.apiUrl}/project/${id}`;
    return this.http.put<any>(url, project);
  }
  deleteProject(id: string): Observable<any> {
    const url = `${this.apiUrl}/project/${id}`;
    return this.http.delete<any>(url);
  }

  // Audit History
  getAuditHistory(id: string): Observable<any> {
    const url = `${this.apiUrl}/audit-history/audit-history-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createAuditHistory(auditHistory: any): Observable<any> {
    const url = `${this.apiUrl}/audit-history`;
    return this.http.post<any>(url, auditHistory);
  }
  updateAuditHistory(id: string, auditHistory: any): Observable<any> {
    const url = `${this.apiUrl}/audit-history/${id}`;
    return this.http.put<any>(url, auditHistory);
  }
  deleteAuditHistory(id: string): Observable<any> {
    const url = `${this.apiUrl}/audit-history/${id}`;
    return this.http.delete<any>(url);
  }

  // Version History
  getVersionHistory(id: string): Observable<any> {
    const url = `${this.apiUrl}/version-history/version-history-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createVersionHistory(versionHistory: any): Observable<any> {
    const url = `${this.apiUrl}/version-history`;
    return this.http.post<any>(url, versionHistory);
  }
  updateVersionHistory(id: string, versionHistory: any): Observable<any> {
    const url = `${this.apiUrl}/version-history/${id}`;
    return this.http.put<any>(url, versionHistory);
  }
  deleteVersionHistory(id: string): Observable<any> {
    const url = `${this.apiUrl}/version-history/${id}`;
    return this.http.delete<any>(url);
  }

  // Project Budget
  getBudget(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-budget/project-budget-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createBudget(budget: any): Observable<any> {
    const url = `${this.apiUrl}/project-budget`;
    return this.http.post<any>(url, budget);
  }
  updateBudget(id: string, budget: any): Observable<any> {
    const url = `${this.apiUrl}/project-budget/${id}`;
    return this.http.put<any>(url, budget);
  }
  deleteBudget(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-budget/${id}`;
    return this.http.delete<any>(url);
  }

  // Project Scope and stack
  getStack(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-scope-stack/project-scope-stack-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createStack(budget: any): Observable<any> {
    const url = `${this.apiUrl}/project-scope-stack`;
    return this.http.post<any>(url, budget);
  }
  updateStack(id: string, budget: any): Observable<any> {
    const url = `${this.apiUrl}/project-scope-stack/${id}`;
    return this.http.put<any>(url, budget);
  }
  deleteStack(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-scope-stack/${id}`;
    return this.http.delete<any>(url);
  }

  // Project Stakeholders
  getStakeholders(id: string): Observable<any> {
    const url = `${this.apiUrl}/stakeholders/stakeholders-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createStakeholder(stakeholder: any): Observable<any> {
    const url = `${this.apiUrl}/stakeholders`;
    return this.http.post<any>(url, stakeholder);
  }
  updateStakeholder(id: string, stakeholder: any): Observable<any> {
    const url = `${this.apiUrl}/stakeholders/${id}`;
    return this.http.put<any>(url, stakeholder);
  }
  deleteStakeholder(id: string): Observable<any> {
    const url = `${this.apiUrl}/stakeholders/${id}`;
    return this.http.delete<any>(url);
  }

  // Risk Profile
  getRisks(id: string): Observable<any> {
    const url = `${this.apiUrl}/risk-profile/risk-profile-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createRisk(risk: any): Observable<any> {
    const url = `${this.apiUrl}/risk-profile`;
    return this.http.post<any>(url, risk);
  }
  updateRisk(id: string, risk: any): Observable<any> {
    const url = `${this.apiUrl}/risk-profile/${id}`;
    return this.http.put<any>(url, risk);
  }
  deleteRisk(id: string): Observable<any> {
    const url = `${this.apiUrl}/risk-profile/${id}`;
    return this.http.delete<any>(url);
  }

  // Phases & MIlestones
  getPhases(id: string): Observable<any> {
    const url = `${this.apiUrl}/phase-milestone/phase-milestone-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createPhase(phase: any): Observable<any> {
    const url = `${this.apiUrl}/phase-milestone`;
    return this.http.post<any>(url, phase);
  }
  updatePhase(id: string, phase: any): Observable<any> {
    const url = `${this.apiUrl}/phase-milestone/${id}`;
    return this.http.put<any>(url, phase);
  }
  deletePhase(id: string): Observable<any> {
    const url = `${this.apiUrl}/phase-milestone/${id}`;
    return this.http.delete<any>(url);
  }

  // Sprint wise details
  getSprints(id: string): Observable<any> {
    const url = `${this.apiUrl}/sprint/sprint-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createSprint(sprint: any): Observable<any> {
    const url = `${this.apiUrl}/sprint`;
    return this.http.post<any>(url, sprint);
  }
  updateSprint(id: string, sprint: any): Observable<any> {
    const url = `${this.apiUrl}/sprint/${id}`;
    return this.http.put<any>(url, sprint);
  }
  deleteSprint(id: string): Observable<any> {
    const url = `${this.apiUrl}/sprint/${id}`;
    return this.http.delete<any>(url);
  }

  // Escalation Matrix
  getEscalations(id: string): Observable<any> {
    const url = `${this.apiUrl}/escalation-matrix/escalation-matrix-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createEscalation(escalation: any): Observable<any> {
    const url = `${this.apiUrl}/escalation-matrix`;
    return this.http.post<any>(url, escalation);
  }
  updateEscalation(id: string, escalation: any): Observable<any> {
    const url = `${this.apiUrl}/escalation-matrix/${id}`;
    return this.http.put<any>(url, escalation);
  }
  deleteEscalation(id: string): Observable<any> {
    const url = `${this.apiUrl}/escalation-matrix/${id}`;
    return this.http.delete<any>(url);
  }

  // Approved Team
  getTeams(id: string): Observable<any> {
    const url = `${this.apiUrl}/approved-team/approved-team-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createTeam(escalation: any): Observable<any> {
    const url = `${this.apiUrl}/approved-team`;
    return this.http.post<any>(url, escalation);
  }
  updateTeam(id: string, escalation: any): Observable<any> {
    const url = `${this.apiUrl}/approved-team/${id}`;
    return this.http.put<any>(url, escalation);
  }
  deleteTeam(id: string): Observable<any> {
    const url = `${this.apiUrl}/approved-team/${id}`;
    return this.http.delete<any>(url);
  }

  // Project Resources
  getResources(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-resources/project-resources-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createResource(escalation: any): Observable<any> {
    const url = `${this.apiUrl}/project-resources`;
    return this.http.post<any>(url, escalation);
  }
  updateResource(id: string, escalation: any): Observable<any> {
    const url = `${this.apiUrl}/project-resources/${id}`;
    return this.http.put<any>(url, escalation);
  }
  deleteResource(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-resources/${id}`;
    return this.http.delete<any>(url);
  }

  // Client Feedback
  getFeedbacks(id: string): Observable<any> {
    const url = `${this.apiUrl}/client-feedback/client-feedback-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createFeedback(escalation: any): Observable<any> {
    const url = `${this.apiUrl}/client-feedback`;
    return this.http.post<any>(url, escalation);
  }
  updateFeedback(id: string, escalation: any): Observable<any> {
    const url = `${this.apiUrl}/client-feedback/${id}`;
    return this.http.put<any>(url, escalation);
  }
  deleteFeedback(id: string): Observable<any> {
    const url = `${this.apiUrl}/client-feedback/${id}`;
    return this.http.delete<any>(url);
  }

  // Project Updates
  getUpdates(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-updates/project-updates-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createUpdate(escalation: any): Observable<any> {
    const url = `${this.apiUrl}/project-updates`;
    return this.http.post<any>(url, escalation);
  }
  updateUpdate(id: string, escalation: any): Observable<any> {
    const url = `${this.apiUrl}/project-updates/${id}`;
    return this.http.put<any>(url, escalation);
  }
  deleteUpdate(id: string): Observable<any> {
    const url = `${this.apiUrl}/project-updates/${id}`;
    return this.http.delete<any>(url);
  }

  // Project Updates
  getMoms(id: string): Observable<any> {
    const url = `${this.apiUrl}/meeting-minute/meeting-minute-by-project-id/${id}`;
    return this.http.get<any>(url);
  }
  createMom(escalation: any): Observable<any> {
    const url = `${this.apiUrl}/meeting-minute`;
    return this.http.post<any>(url, escalation);
  }
  updateMom(id: string, escalation: any): Observable<any> {
    const url = `${this.apiUrl}/meeting-minute/${id}`;
    return this.http.put<any>(url, escalation);
  }
  deleteMom(id: string): Observable<any> {
    const url = `${this.apiUrl}/meeting-minute/${id}`;
    return this.http.delete<any>(url);
  }
}
