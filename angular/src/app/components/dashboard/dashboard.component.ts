import { Component } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UpdateProjectComponent } from '../update-modals/update-project/update-project.component';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from '../../models/roles.model';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  projects!: Project[];

  totalProjects: number = 0;
  lazyTotalProjects: number = 0;

  statusOfProjects: any = {
    progress: 0,
    completed: 0,
    hold: 0,
  };
  lazyStatusOfProjects: any = {
    progress: 0,
    completed: 0,
    hold: 0,
  };

  loading: boolean = false;

  userRoleId: string = '';
  userRoleName: string = '';
  roles = Roles;

  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private dialog: MatDialog,
    private toast: NgToastService,
    private role:UserRoleService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.role.userRoleSubject.subscribe((data) => {
      this.userRoleId = data.id;
      this.userRoleName = data.name;
    })
    this.userRoleId = this.role.userRoleId;
    this.loading = false;
    this.getAllProjects();
    
  }

  getAllProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe((response) => {
      this.projects = response.items;
      this.statusCounter(response.items);
      this.lazyCounter();
      this.loading = false;
    });
  }

  deleteProject(id: string, projectName: string): void {
    let confirmDelete = confirm(
      `Are you sure, you want to delete project "${projectName}" `
    );
    if (confirmDelete) {
      this.projectService.deleteProject(id).subscribe(
        (response) => {
          this.toast.success({
            detail: 'Deleted',
            summary: 'Project deleted successfully',
            duration: 4000,
          });
          console.log('Project deleted successfully:', response);
          this.getAllProjects();
          this.lazyCounter();
          // Handle success response, if needed
        },
        (error) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Failed to delete project',
            duration: 4000,
          });
          console.error('Failed to delete project:', error);
          // Handle error response, if needed
        }
      );
    }
  }

  openUpdateProjectModal(index: number) {
    const projectToUpdate = { ...this.projects[index] };
    const dialogRef = this.dialog.open(UpdateProjectComponent, {
      width: '70%',
      data: projectToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);

      // this.sendEmail(result);
      if (result)
        this.getAllProjects();
    });
  }

  statusCounter(tempProjects: any): void {
    this.totalProjects = 0;
    this.statusOfProjects = {
      progress: 0,
      completed: 0,
      hold: 0,
    };
    tempProjects.forEach((project: any) => {
      this.totalProjects++;
      switch (project.status.toLowerCase()) {
        case 'progress':
          this.statusOfProjects.progress++;
          break;
        case 'completed':
          this.statusOfProjects.completed++;
          break;
        case 'hold':
          this.statusOfProjects.hold++;
          break;
      }
    });
  }

  lazyCounter() {
    this.lazyTotalProjects = 0;
    this.lazyStatusOfProjects = {
      progress: 0,
      completed: 0,
      hold: 0,
    };

    const lazyInterval1 = setInterval(() => {
      if (this.lazyTotalProjects < this.totalProjects) this.lazyTotalProjects++;
      else clearInterval(lazyInterval1);
    }, 250);

    const lazyInterval2 = setInterval(() => {
      if (this.lazyStatusOfProjects.progress < this.statusOfProjects.progress)
        this.lazyStatusOfProjects.progress++;
      else clearInterval(lazyInterval2);
    }, 250);

    const lazyInterval3 = setInterval(() => {
      if (this.lazyStatusOfProjects.completed < this.statusOfProjects.completed)
        this.lazyStatusOfProjects.completed++;
      else clearInterval(lazyInterval3);
    }, 250);

    const lazyInterval4 = setInterval(() => {
      if (this.lazyStatusOfProjects.hold < this.statusOfProjects.hold)
        this.lazyStatusOfProjects.hold++;
      else clearInterval(lazyInterval4);
    }, 250);
  }
}
