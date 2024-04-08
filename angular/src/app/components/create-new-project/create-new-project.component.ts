import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from '../../services/users.service';
import { UserOfRole } from '../../models/userOfRole.model';
import { Roles } from '../../models/roles.model';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrl: './create-new-project.component.scss',
})
export class CreateNewProjectComponent {
  projectForm: any;
  projectManagers: UserOfRole[] = [];
  clients: UserOfRole[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private router: Router,
    private toast: NgToastService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      projectManager: ['', Validators.required],
      creationTime: ['',Validators.required]
    });

    // Get list of project managers
    const resultPm = this.userService.getUsersOfRole(Roles['Project Manager']);
    resultPm.then((users) => {
      console.log(users);
      this.projectManagers = users;
    });
    // Get list of clients
    const resultClient = this.userService.getUsersOfRole(Roles['Client']);
    resultClient.then((users) => {
      console.log(users);
      this.clients = users;
    });
  }

  createProject() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {

      const newProject: any = {
        name: this.projectForm.value.name,
        clientId: this.projectForm.value.client.split(',')[0],
        clientName: this.projectForm.value.client.split(',')[1],
        clientEmail: this.projectForm.value.client.split(',')[2],
        projectManagerID: this.projectForm.value.projectManager.split(',')[0],
        projectManagerName: this.projectForm.value.projectManager.split(',')[1],
        membersAssociated: 2,
      };

      this.projectService.createProject(newProject).subscribe(
        (response) => {
          this.toast.success({
            detail: 'Created',
            summary: 'Project created successfully',
            duration: 4000,
          });
          console.log('Project created successfully:', response);
          this.router.navigate(['/dashboard']);
          // Handle success response
        },
        (error) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Failed to create project',
            duration: 4000,
          });
          console.error('Failed to create project:', error);
          // Handle error response
        }
      );
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Invalid input, please check your inputs',
        duration: 4000,
      })
    }
  }
}
