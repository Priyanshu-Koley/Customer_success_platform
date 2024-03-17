import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { UpdateProjectScopeStackComponent } from '../../update-modals/update-project-scope-stack/update-project-scope-stack.component';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-project-scope-stack',
  templateUrl: './project-scope-stack.component.html',
  styleUrl: './project-scope-stack.component.scss',
})
export class ProjectScopeStackComponent {
  @Input({required: true}) userRoleId: string = '';
  projectId!: string;
  stackForm: any;
  stacks: any;
  roles = Roles;

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

  openUpdateStackModal(index: number) {
    const stackToUpdate = { ...this.stacks[index], projectId: this.projectId };
    const dialogRef = this.dialog.open(UpdateProjectScopeStackComponent, {
      width: '70%',
      data: stackToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);

      // this.sendEmail(result);
      if (result) this.getStack();
    });
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF('stack-table', 'stack-table');
  }
}
