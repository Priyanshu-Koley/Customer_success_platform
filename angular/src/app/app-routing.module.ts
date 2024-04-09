import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ProjectManagerListComponent } from './components/User-List/project-manager-list/project-manager-list.component';
import { AdminListComponent } from './components/User-List/admin-list/admin-list.component';
import { ClientListComponent } from './components/User-List/client-list/client-list.component';
import { AuditorListComponent } from './components/User-List/auditor-list/auditor-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateNewProjectComponent },
  { path: 'edit', component: EditProjectComponent },
  { path: 'details/:id', component: ProjectDetailsComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'admins', component: AdminListComponent },
  { path: 'project-managers', component: ProjectManagerListComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'auditors', component: AuditorListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
