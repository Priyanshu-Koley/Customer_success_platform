import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { VersionHistoryComponent } from './components/project-details-tabs/version-history/version-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateNewProjectComponent },
  { path: 'edit', component: EditProjectComponent },
  { path: 'details/:id', component: ProjectDetailsComponent },
  // { path: 'details/version-history/:id', component: VersionHistoryComponent },
  // { path: 'employee/edit/:id', component: EmployeeAddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
