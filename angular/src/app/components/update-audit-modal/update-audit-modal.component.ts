import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../../services/projects.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-audit-modal',
  templateUrl: './update-audit-modal.component.html',
  styleUrl: './update-audit-modal.component.scss',
})
export class UpdateAuditModalComponent {
  updateAuditForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateAuditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateAuditForm = this.formBuilder.group({
      reviewedBy: [data.reviewedBy, Validators.required],
      status: [data.status, Validators.required],
      reviewedSection: [data.reviewedSection, Validators.required],
      comment: [data.comment, Validators.required],
      actionItem: [data.actionItem, Validators.required],
    });
  }

  updateAudit() {
    if (this.updateAuditForm.valid) {

      const updatedAudit = {
        auditDate: new Date(),
        reviewedBy: this.updateAuditForm.value.reviewedBy,
        status: this.updateAuditForm.value.status,
        reviewedSection: this.updateAuditForm.value.reviewedSection,
        comment: this.updateAuditForm.value.comment,
        actionItem: this.updateAuditForm.value.actionItem,
        projectId: this.data.projectId,
      };

      this.projectService.updateAuditHistory(this.data.id, updatedAudit).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Success',
            summary: 'Audit updated successfully',
            duration: 4000,
          });
          this.dialogRef.close(updatedAudit);
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error updating audit',
            duration: 4000,
          });
        }
      );     
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
