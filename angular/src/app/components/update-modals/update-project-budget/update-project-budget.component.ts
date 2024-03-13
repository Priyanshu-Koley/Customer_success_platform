import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectType } from '../../../models/project-type.model';

@Component({
  selector: 'app-update-project-budget',
  templateUrl: './update-project-budget.component.html',
  styleUrl: './update-project-budget.component.scss',
})
export class UpdateProjectBudgetComponent {
  updateBudgetForm: FormGroup;
  ProjectType = ProjectType;

  constructor(
    private dialogRef: MatDialogRef<UpdateProjectBudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateBudgetForm = this.formBuilder.group({
      type: [this.data.type, [Validators.required]],
      durationInMonths: [
        this.data.durationInMonths,
        [Validators.required, Validators.min(1)],
      ],
      budgetedHours: [
        this.data.budgetedHours,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  updateBudget() {
    if (this.updateBudgetForm.valid) {
      const updatedBudget = {
        type: this.updateBudgetForm.value.type,
        durationInMonths: Math.round(
          this.updateBudgetForm.value.durationInMonths
        ),
        budgetedHours: Math.round(this.updateBudgetForm.value.budgetedHours),
        projectId: this.data.projectId,
      };

      this.projectService.updateBudget(this.data.id, updatedBudget).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Success',
            summary: 'Budget updated successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error updating budget',
            duration: 4000,
          });
        }
      );
      this.dialogRef.close(updatedBudget);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
