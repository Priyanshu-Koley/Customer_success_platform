import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private formBuilder: FormBuilder
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

      // Here you can handle form submission, for example, send data to backend
      console.log(this.updateAuditForm.value);
      this.dialogRef.close(this.updateAuditForm.value);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
