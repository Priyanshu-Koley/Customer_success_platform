import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';

@Component({
  selector: 'app-project-scope-stack',
  templateUrl: './project-scope-stack.component.html',
  styleUrl: './project-scope-stack.component.scss',
})
export class ProjectScopeStackComponent {
  projectId!: string;
  stackForm: any;
  stacks: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog,
    private convertToPdf: ConvertToPdfService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.stackForm = this.formBuilder.group({
      stack: ['', [Validators.required]],
      scope: ['', [Validators.required]],
    });

    this.getStack();
  }

  getStack() {
    this.projectService.getStack(this.projectId).subscribe(
      (res) => {
        this.stacks = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addStack() {
    if (this.stackForm.valid) {
      const newStack = {
        ...this.stackForm.value,
        projectId: this.projectId,
      };

      this.projectService.createStack(newStack).subscribe(
        (res) => {
          console.log(res);
          this.getStack();
          this.stackForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Scope and Stack added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Scope and Stack',
            duration: 4000,
          });
        }
      );
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Please fill all the fields with valid data',
        duration: 4000,
      });
    }
  }

  deleteStack(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteStack(id).subscribe(
        (res) => {
          console.log(res);
          this.getStack();
          this.toast.success({
            detail: 'Success',
            summary: 'Scope and Stack deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Scope and Stack',
            duration: 4000,
          });
        }
      );
    }
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF('stack-table', 'stack-table');
  }
}
