import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { UpdateEscalationMatrixComponent } from '../../update-modals/update-escalation-matrix/update-escalation-matrix.component';
import { UpdateStakeholdersComponent } from '../../update-modals/update-stakeholders/update-stakeholders.component';

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrl: './stakeholders.component.scss',
})
export class StakeholdersComponent {
  projectId!: string;
  stakeholderForm: any;
  stakeholders: any;

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

    this.stakeholderForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        ],
      ],
    });

    this.getStakeholders();
  }

  getStakeholders() {
    this.projectService.getStakeholders(this.projectId).subscribe(
      (res) => {
        this.stakeholders = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addStakeholder() {
    if (this.stakeholderForm.valid) {
      const newStakeholder = {
        ...this.stakeholderForm.value,
        projectId: this.projectId,
        userId: this.projectId,
      };

      this.projectService.createStakeholder(newStakeholder).subscribe(
        (res) => {
          console.log(res);
          this.getStakeholders();
          this.stakeholderForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Stakeholder added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Stakeholder',
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

  deleteStakeholder(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteStakeholder(id).subscribe(
        (res) => {
          console.log(res);
          this.getStakeholders();
          this.toast.success({
            detail: 'Success',
            summary: 'Stakeholder deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Stakeholder',
            duration: 4000,
          });
        }
      );
    }
  }

  openUpdateStakeholderModal(index: number) {
    const stakeholderToUpdate = { ...this.stakeholders[index], projectId: this.projectId };
    const dialogRef = this.dialog.open(UpdateStakeholdersComponent, {
      width: '70%',
      data: stakeholderToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);

      // this.sendEmail(result);
      if (result) this.getStakeholders();
    });
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF('stakeholders-table', 'stakeholders-table');
  }
}
