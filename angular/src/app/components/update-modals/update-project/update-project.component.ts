import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { UsersService } from '../../../services/users.service';
import { UserOfRole } from '../../../models/userOfRole.model';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss',
})
export class UpdateProjectComponent {
  loading: boolean = false;
  editProjectForm: FormGroup;
  projectManagers: UserOfRole[] = [];
  clients: UserOfRole[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService,
    private userService: UsersService
  ) {
    this.editProjectForm = this.formBuilder.group({
      creationTime: [
        this.data.creationTime.substr(0, 10),
        [Validators.required],
      ],
      name: [this.data.name, [Validators.required]],
      projectManager: [
        `${this.data.projectManagerId},${this.data.projectManagerName}`,
        [Validators.required],
      ],
      client: [
        `${this.data.clientId},${this.data.clientName},${this.data.clientEmail}`,
        [Validators.required],
      ],
      status: [this.data.status, [Validators.required]],
    });

    this.loading = true;
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
      this.loading = false;
    });
  }

  editProject() {
    if (this.editProjectForm.valid) {
      const updatedProject = {
        ...this.data,
        name: this.editProjectForm.value.name,
        clientId: this.editProjectForm.value.client.split(',')[0],
        clientName: this.editProjectForm.value.client.split(',')[1],
        clientEmail: this.editProjectForm.value.client.split(',')[2],
        projectManagerID:
          this.editProjectForm.value.projectManager.split(',')[0],
        projectManagerName:
          this.editProjectForm.value.projectManager.split(',')[1],
      };

      this.projectService.updateProject(this.data.id, updatedProject).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Success',
            summary: 'Project updated successfully',
            duration: 4000,
          });
          this.dialogRef.close(updatedProject);
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error updating Project',
            duration: 4000,
          });
        }
      );
    } else {
      this.toast.error({
        detail: 'Invalid input',
        summary: 'Please fill all the fields with valid data',
        duration: 4000,
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
