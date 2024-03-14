import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../../../services/projects.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-version-history',
  templateUrl: './update-version-history.component.html',
  styleUrl: './update-version-history.component.scss',
})
export class UpdateVersionHistoryComponent {
  updateVersionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateVersionHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateVersionForm = this.formBuilder.group({
      version: [data.version, [Validators.required, Validators.min(1)]],
      type: [data.type, [Validators.required]],
      change: [data.change, [Validators.required]],
      changeReason: [data.changeReason, [Validators.required]],
      createdBy: [data.createdBy, [Validators.required]],
      revisionDate: [data.revisionDate, [Validators.required]],
      approvalDate: [data.approvalDate, [Validators.required]],
      approvedBy: [data.approvedBy, [Validators.required]],
    });
  }

  updateVersion() {
    if (this.updateVersionForm.valid) {
      const updatedVersion = {
        ...this.updateVersionForm.value,
        versionDate: new Date(),
        projectId: this.data.projectId,
      };

      this.projectService
        .updateVersionHistory(this.data.id, updatedVersion)
        .subscribe(
          (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Success',
              summary: 'Version updated successfully',
              duration: 4000,
            });
            this.dialogRef.close(updatedVersion);
          },
          (err) => {
            console.log(err);
            this.toast.error({
              detail: 'Error',
              summary: 'Error updating version',
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
