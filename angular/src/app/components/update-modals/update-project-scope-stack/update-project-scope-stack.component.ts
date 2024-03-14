import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ProjectType } from '../../../models/project-type.model';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-update-project-scope-stack',
  templateUrl: './update-project-scope-stack.component.html',
  styleUrl: './update-project-scope-stack.component.scss',
})
export class UpdateProjectScopeStackComponent {
  updateStackForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateProjectScopeStackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private toast: NgToastService
  ) {
    this.updateStackForm = this.formBuilder.group({
      stack: [this.data.stack, [Validators.required]],
      scope: [this.data.scope, [Validators.required]],
    });
  }

  updateStack() {
    if (this.updateStackForm.valid) {
      const updatedStack = {
        ...this.updateStackForm.value,
        projectId: this.data.projectId,
      };

      this.projectService.updateStack(this.data.id, updatedStack).subscribe(
        (res) => {
          console.log(res);
          this.toast.success({
            detail: 'Success',
            summary: 'Stack updated successfully',
            duration: 4000,
          });
          this.dialogRef.close(updatedStack);
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error updating stack',
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
