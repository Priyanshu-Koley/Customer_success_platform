import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-update-approved-team',
  templateUrl: './update-approved-team.component.html',
  styleUrl: './update-approved-team.component.scss',
})
export class UpdateApprovedTeamComponent {
  updateTeamForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateApprovedTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateTeamForm = this.formBuilder.group({
      numberOfResources: [
        this.data.numberOfResources,
        [Validators.required, Validators.min(1)],
      ],
      role: [this.data.role, [Validators.required]],
      availability: [
        this.data.availability,
        [Validators.required, Validators.min(1)],
      ],
      duration: [this.data.duration, [Validators.required]],
    });
  }

  updateTeam() {
    if (this.updateTeamForm.valid) {
      const updatedTeam = {
        ...this.updateTeamForm.value,
        phaseNumber: this.data.phaseNumber,
        projectId: this.data.projectId,
      };

      this.projectService.updateTeam(this.data.id, updatedTeam).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Success',
            summary: 'Team updated successfully',
            duration: 4000,
          });
          this.dialogRef.close(updatedTeam);
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error updating Team',
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
