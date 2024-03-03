import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  projects!: Project[];

  totalProjects: number = 0;

  statusOfProjects: any = {
    progress:0,
    completed:0,
    hold:0,
  };

  constructor(private projectService: ProjectsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getProjects().subscribe(response => {
      this.projects = response.items;
      this.statusCounter(response.items);
    });

  }

  deleteProject(id: string,projectName: string): void {

    let confirmDelete = confirm(`Are you sure, you want to delete project "${projectName}" `);
    if(confirmDelete)
    {
      this.projectService.deleteProject(id).subscribe(
        response => {
          console.log('Project deleted successfully:', response);
          this.getAllProjects();
          // Handle success response, if needed
        },
        error => {
          console.error('Failed to delete project:', error);
          // Handle error response, if needed
        }
      );
    }
  }

  statusCounter(tempProjects:any): void {
    tempProjects.forEach((project:any)=>{
      
      this.totalProjects++;
      switch(project.status.toLowerCase())
      {
        case "progress":
          this.statusOfProjects.progress++;
          break;
        case "completed":
          this.statusOfProjects.completed++;
          break;
        case "hold":
          this.statusOfProjects.hold++;
          break;
      }
    });
  }


}
