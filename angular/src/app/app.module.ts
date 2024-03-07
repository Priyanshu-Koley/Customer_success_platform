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
    VersionHistoryComponent,
    ProjectBudgetComponent,
    ProjectScopeStackComponent,
    StakeholdersComponent,
    RiskProfileComponent,
    PhasesComponent,
    SprintComponent,
    EscalationMatrixComponent,
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
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
