import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { ProjectsService } from '../../../services/projects.service';
import { UpdateProjectResourcesComponent } from '../../update-modals/update-project-resources/update-project-resources.component';

@Component({
  selector: 'app-project-resources',
  templateUrl: './project-resources.component.html',
  styleUrl: './project-resources.component.scss',
})
export class ProjectResourcesComponent {
  projectId!: string;
  resourceForm: any;
  resources: any;

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

    this.resourceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      allocationPercentage: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    });

    this.getResources();
  }

  getResources() {
    this.projectService.getResources(this.projectId).subscribe(
      (res) => {
        this.resources = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addResource() {
    if (this.resourceForm.valid) {
      const newResource = {
        ...this.resourceForm.value,
        projectId: this.projectId,
      };

      this.projectService.createResource(newResource).subscribe(
        (res) => {
          console.log(res);
          this.getResources();
          this.resourceForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Resource added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Resource',
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

  deleteResource(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteResource(id).subscribe(
        (res) => {
          console.log(res);
          this.getResources();
          this.toast.success({
            detail: 'Success',
            summary: 'Resource deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Resource',
            duration: 4000,
          });
        }
      );
    }
  }

  openUpdateResourceModal(index: number) {
    const resourceToUpdate = { ...this.resources[index], projectId: this.projectId };
    const dialogRef = this.dialog.open(UpdateProjectResourcesComponent, {
      width: '70%',
      data: resourceToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);

      // this.sendEmail(result);
      if (result) this.getResources();
    });
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF('resource-table', 'resource-table');
  }
}
