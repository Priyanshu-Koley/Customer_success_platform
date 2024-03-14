import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { UpdatePhasesComponent } from '../update-phases/update-phases.component';

@Component({
  selector: 'app-update-project-resources',
  templateUrl: './update-project-resources.component.html',
  styleUrl: './update-project-resources.component.scss',
})
export class UpdateProjectResourcesComponent {
  updateResourceForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdatePhasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateResourceForm = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],
      role: [this.data.role, [Validators.required]],
      start: [this.data.start.substr(0, 10), [Validators.required]],
      end: [this.data.end.substr(0, 10), [Validators.required]],
      allocationPercentage: [
        this.data.allocationPercentage,
        [Validators.required],
      ],
      comments: [this.data.comments, [Validators.required]],
    });
  }

  updateResource() {
    if (this.updateResourceForm.valid) {
      const updatedResource = {
        ...this.updateResourceForm.value,
        projectId: this.data.projectId,
      };

      this.projectService
        .updateResource(this.data.id, updatedResource)
        .subscribe(
          (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Success',
              summary: 'Resource updated successfully',
              duration: 4000,
            });
            this.dialogRef.close(updatedResource);
          },
          (err) => {
            console.log(err);
            this.toast.error({
              detail: 'Error',
              summary: 'Error updating Resource',
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
