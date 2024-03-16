import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProjectComponent } from './components/edit-project/edit-project.component';

import { NgToastModule } from 'ng-angular-popup';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UpdateAuditModalComponent } from './components/update-audit-modal/update-audit-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { VersionHistoryComponent } from './components/project-details-tabs/version-history/version-history.component';
import { ProjectBudgetComponent } from './components/project-details-tabs/project-budget/project-budget.component';
import { ProjectScopeStackComponent } from './components/project-details-tabs/project-scope-stack/project-scope-stack.component';
import { StakeholdersComponent } from './components/project-details-tabs/stakeholders/stakeholders.component';
import { RiskProfileComponent } from './components/project-details-tabs/risk-profile/risk-profile.component';
import { PhasesComponent } from './components/project-details-tabs/phases/phases.component';
import { SprintComponent } from './components/project-details-tabs/sprint/sprint.component';
import { EscalationMatrixComponent } from './components/project-details-tabs/escalation-matrix/escalation-matrix.component';
import { DatePipe } from '@angular/common';
import { ApprovedTeamComponent } from './components/project-details-tabs/approved-team/approved-team.component';
import { ProjectResourcesComponent } from './components/project-details-tabs/project-resources/project-resources.component';
import { ClientFeedbackComponent } from './components/project-details-tabs/client-feedback/client-feedback.component';
import { ProjectUpdatesComponent } from './components/project-details-tabs/project-updates/project-updates.component';
import { MeetingMinuteComponent } from './components/project-details-tabs/meeting-minute/meeting-minute.component';
import { UpdateVersionHistoryComponent } from './components/update-modals/update-version-history/update-version-history.component';
import { UpdateProjectBudgetComponent } from './components/update-modals/update-project-budget/update-project-budget.component';
import { UpdateProjectScopeStackComponent } from './components/update-modals/update-project-scope-stack/update-project-scope-stack.component';
import { UpdateEscalationMatrixComponent } from './components/update-modals/update-escalation-matrix/update-escalation-matrix.component';
import { UpdateStakeholdersComponent } from './components/update-modals/update-stakeholders/update-stakeholders.component';
import { UpdateRiskProfileComponent } from './components/update-modals/update-risk-profile/update-risk-profile.component';
import { UpdatePhasesComponent } from './components/update-modals/update-phases/update-phases.component';
import { UpdateApprovedTeamComponent } from './components/update-modals/update-approved-team/update-approved-team.component';
import { UpdateProjectResourcesComponent } from './components/update-modals/update-project-resources/update-project-resources.component';
import { UpdateProjectUpdatesComponent } from './components/update-modals/update-project-updates/update-project-updates.component';
import { UpdateProjectComponent } from './components/update-modals/update-project/update-project.component';


import { AuthModule } from '@auth0/auth0-angular';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateUserComponent } from './components/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    CreateNewProjectComponent,
    EditProjectComponent,
    ProjectDetailsComponent,
    UpdateAuditModalComponent,
    UpdateVersionHistoryComponent,
    VersionHistoryComponent,
    ProjectBudgetComponent,
    ProjectScopeStackComponent,
    StakeholdersComponent,
    RiskProfileComponent,
    PhasesComponent,
    SprintComponent,
    EscalationMatrixComponent,
    ApprovedTeamComponent,
    ProjectResourcesComponent,
    ClientFeedbackComponent,
    ProjectUpdatesComponent,
    MeetingMinuteComponent,
    UpdateProjectBudgetComponent,
    UpdateProjectScopeStackComponent,
    UpdateEscalationMatrixComponent,
    UpdateStakeholdersComponent,
    UpdateRiskProfileComponent,
    UpdatePhasesComponent,
    UpdateApprovedTeamComponent,
    UpdateProjectResourcesComponent,
    UpdateProjectUpdatesComponent,
    UpdateProjectComponent,
    LandingPageComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    AuthModule.forRoot({
      domain: 'dev-0dw7km0b5mi1uoc6.us.auth0.com',
      clientId: 'lwSuzJYmMmrrldmodQi4F2j1alfWC4PJ',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
      cacheLocation: 'localstorage'
    }),
    MatProgressSpinnerModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
