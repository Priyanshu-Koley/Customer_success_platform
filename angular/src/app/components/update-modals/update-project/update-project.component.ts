import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.scss',
})
export class UpdateProjectComponent {
  editProjectForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.editProjectForm = this.formBuilder.group({
      creationTime: [this.data.creationTime.substr(0,10), [Validators.required]],
      name: [this.data.name, [Validators.required]],
      projectManagerName: [this.data.projectManagerName, [Validators.required]],
      membersAssociated: [
        this.data.membersAssociated,
        [Validators.required, Validators.min(1)],
      ],
      clientName: [this.data.clientName, [Validators.required]],
      clientEmail: [this.data.clientEmail, [Validators.required]],
      status: [this.data.status, [Validators.required]],
    });
    
  }

  editProject() {
    if (this.editProjectForm.valid) {
      const updatedProject = {
        ...this.data,
        ...this.editProjectForm.value,
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
