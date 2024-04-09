import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-update-stakeholders',
  templateUrl: './update-stakeholders.component.html',
  styleUrl: './update-stakeholders.component.scss',
})
export class UpdateStakeholdersComponent {
  updateStakeholderForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateStakeholdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateStakeholderForm = this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      name: [this.data.name, [Validators.required]],
      contact: [
        this.data.contact,
        [
          Validators.required
        ],
      ],
    });
  }

  updateStakeholder() {
    if (this.updateStakeholderForm.valid) {
      const updatedStakeholder = {
        ...this.updateStakeholderForm.value,
        projectId: this.data.projectId,
        userId: this.data.projectId,
      };

      this.projectService
        .updateStakeholder(this.data.id, updatedStakeholder)
        .subscribe(
          (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Success',
              summary: 'Stakeholder updated successfully',
              duration: 4000,
            });
            this.dialogRef.close(updatedStakeholder);
          },
          (err) => {
            console.log(err);
            this.toast.error({
              detail: 'Error',
              summary: 'Error updating Stakeholder',
              duration: 4000,
            });
          }
        );
    }
    else
    {
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
