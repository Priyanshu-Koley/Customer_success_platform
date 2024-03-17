import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { ProjectsService } from '../../../services/projects.service';
import { UpdateProjectUpdatesComponent } from '../../update-modals/update-project-updates/update-project-updates.component';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-project-updates',
  templateUrl: './project-updates.component.html',
  styleUrl: './project-updates.component.scss',
})
export class ProjectUpdatesComponent {
  @Input({required: true}) userRoleId: string = '';
  projectId!: string;
  updateForm: any;
  updates: any;
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

    this.updateForm = this.formBuilder.group({
      generalUpdates: ['', [Validators.required]],
    });

    this.getUpdates();
  }

  getUpdates() {
    this.projectService.getUpdates(this.projectId).subscribe(
      (res) => {
        this.updates = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addUpdate() {
    if (this.updateForm.valid) {
      const newUpdate = {
        ...this.updateForm.value,
        date: new Date().toJSON().slice(0, 10),
        projectId: this.projectId,
      };

      this.projectService.createUpdate(newUpdate).subscribe(
        (res) => {
          console.log(res);
          this.getUpdates();
          this.updateForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Update added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Update',
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

  deleteUpdate(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteUpdate(id).subscribe(
        (res) => {
          console.log(res);
          this.getUpdates();
          this.toast.success({
            detail: 'Success',
            summary: 'Update deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Update',
            duration: 4000,
          });
        }
      );
    }
  }

  openUpdateProjectUpdateModal(index: number) {
    const projectUpdateToUpdate = { ...this.updates[index], projectId: this.projectId };
    const dialogRef = this.dialog.open(UpdateProjectUpdatesComponent, {
      width: '70%',
      data: projectUpdateToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);

      // this.sendEmail(result);
      if (result) this.getUpdates();
    });
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF('update-table', 'update-table');
  }
}