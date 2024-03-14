import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectType } from '../../../models/project-type.model';
import { ProjectsService } from '../../../services/projects.service';
import { EscalationType } from '../../../models/escalation-type.model';
import { EscalationMatrixLevels } from '../../../models/escalation-matrix-levels.model';

@Component({
  selector: 'app-update-escalation-matrix',
  templateUrl: './update-escalation-matrix.component.html',
  styleUrl: './update-escalation-matrix.component.scss',
})
export class UpdateEscalationMatrixComponent {
  updateEscalationForm: FormGroup;
  escalationType = EscalationType;
  escalationMatrixLevels = EscalationMatrixLevels;

  constructor(
    private dialogRef: MatDialogRef<UpdateEscalationMatrixComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateEscalationForm = this.formBuilder.group({
      responsible: [this.data.responsible, [Validators.required]],
    });
  }

  updateEscalation() {
    if (this.updateEscalationForm.valid) {
      const updatedEscalation = {
        ...this.updateEscalationForm.value,
        escalationType: this.data.escalationType,
        level: this.data.level,
        projectId: this.data.projectId,
      };

      this.projectService
        .updateEscalation(this.data.id, updatedEscalation)
        .subscribe(
          (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Success',
              summary: 'Escalation updated successfully',
              duration: 4000,
            });
            this.dialogRef.close(updatedEscalation);
          },
          (err) => {
            console.log(err);
            this.toast.error({
              detail: 'Error',
              summary: 'Error updating escalation',
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
