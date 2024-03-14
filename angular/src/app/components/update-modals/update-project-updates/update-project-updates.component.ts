import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { UpdatePhasesComponent } from '../update-phases/update-phases.component';

@Component({
  selector: 'app-update-project-updates',
  templateUrl: './update-project-updates.component.html',
  styleUrl: './update-project-updates.component.scss',
})
export class UpdateProjectUpdatesComponent {
  updateProjectUpdateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdatePhasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateProjectUpdateForm = this.formBuilder.group({
      generalUpdates: [this.data.generalUpdates, [Validators.required]],
    });
  }

  updateProjectUpdate() {
    if (this.updateProjectUpdateForm.valid) {
      const updatedProjectUpdates = {
        ...this.updateProjectUpdateForm.value,
        date: new Date().toISOString(),
        projectId: this.data.projectId,
      };

      this.projectService
        .updateUpdate(this.data.id, updatedProjectUpdates)
        .subscribe(
          (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Success',
              summary: 'Project updates updated successfully',
              duration: 4000,
            });
            this.dialogRef.close(updatedProjectUpdates);
          },
          (err) => {
            console.log(err);
            this.toast.error({
              detail: 'Error',
              summary: 'Error updating Project updates',
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
