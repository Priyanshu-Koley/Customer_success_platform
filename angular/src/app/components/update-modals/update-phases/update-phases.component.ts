import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectType } from '../../../models/project-type.model';
import { ProjectsService } from '../../../services/projects.service';
import { MilestoneOrPhaseStatus } from '../../../models/milestone-phase-status.model';

@Component({
  selector: 'app-update-phases',
  templateUrl: './update-phases.component.html',
  styleUrl: './update-phases.component.scss',
})
export class UpdatePhasesComponent {
  updatePhaseForm: FormGroup;
  phaseStatus = MilestoneOrPhaseStatus;

  constructor(
    private dialogRef: MatDialogRef<UpdatePhasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updatePhaseForm = this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      startDate: [this.data.startDate.substr(0, 10), [Validators.required]],
      endDate: [this.data.endDate.substr(0, 10), [Validators.required]],
      approvalDate: [
        this.data.approvalDate.substr(0, 10),
        [Validators.required],
      ],
      status: [this.data.status, [Validators.required]],
      revisedCompletionDate: [
        this.data.revisedCompletionDate.substr(0, 10),
        [Validators.required],
      ],
      comments: [this.data.comments, [Validators.required]],
    });
  }

  updatePhase() {
    if (this.updatePhaseForm.valid) {
      const updatedPhase = {
        ...this.updatePhaseForm.value,
        projectId: this.data.projectId,
      };

      this.projectService.updatePhase(this.data.id, updatedPhase).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Success',
            summary: 'Phase updated successfully',
            duration: 4000,
          });
          this.dialogRef.close(updatedPhase);
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error updating Phase',
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
