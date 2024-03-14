import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { RiskType } from '../../../models/risk-type.model';
import { RiskSeverity } from '../../../models/risk-severity.model';
import { RiskImpact } from '../../../models/risk-impact.model';

@Component({
  selector: 'app-update-risk-profile',
  templateUrl: './update-risk-profile.component.html',
  styleUrl: './update-risk-profile.component.scss',
})
export class UpdateRiskProfileComponent {
  updateRiskForm: FormGroup;
  riskTypes = RiskType;
  riskSeverity = RiskSeverity;
  riskImpact = RiskImpact;

  constructor(
    private dialogRef: MatDialogRef<UpdateRiskProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateRiskForm = this.formBuilder.group({
      riskType: [this.data.riskType, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      severity: [this.data.severity, [Validators.required]],
      impact: [this.data.impact, [Validators.required]],
      remedialSteps: [this.data.remedialSteps, [Validators.required]],
      status: [this.data.status, [Validators.required]],
      closureDate: [
        this.data.closureDate.substr(0, 10),
        [Validators.required],
      ],
    });
  }

  updateRisk() {
    if (this.updateRiskForm.valid) {
      const updatedRisk = {
        ...this.updateRiskForm.value,
        projectId: this.data.projectId,
      };

      this.projectService.updateRisk(this.data.id, updatedRisk).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Success',
            summary: 'Risk updated successfully',
            duration: 4000,
          });
          this.dialogRef.close(updatedRisk);
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error updating Risk',
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
