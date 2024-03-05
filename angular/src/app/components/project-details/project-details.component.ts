import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UpdateAuditModalComponent } from '../update-audit-modal/update-audit-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  projectId!: string;
  auditForm: any;
  audits: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.auditForm = this.formBuilder.group({
      reviewedBy: ['', [Validators.required]],
      status: ['', [Validators.required]],
      reviewedSection: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      actionItem: ['', [Validators.required]],
    });

    this.getAuditHistory();
  }

  getAuditHistory() {
    this.projectService.getAuditHistory(this.projectId).subscribe(
      (res) => {
        this.audits = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addAudit() {
    if (this.auditForm.valid) {
      const newAudit = {
        auditDate: new Date(),
        reviewedBy: this.auditForm.value.reviewedBy,
        status: this.auditForm.value.status,
        reviewedSection: this.auditForm.value.reviewedSection,
        comment: this.auditForm.value.comment,
        actionItem: this.auditForm.value.actionItem,
        projectId: this.projectId,
      };

      this.projectService.createAuditHistory(newAudit).subscribe(
        (res) => {
          console.log(res);
          this.getAuditHistory();
          this.toast.success({
            detail: 'Success Message',
            summary: 'Audit added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding audit',
            duration: 4000,
          });
        }
      );
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Please fill all the required fields',
        duration: 4000,
      });
    }
  }

  openUpdateAuditModal(index: number) {
    const auditToUpdate = this.audits[index];
    const dialogRef = this.dialog.open(UpdateAuditModalComponent, {
      width: '70%',
      height: '300px',
      data: auditToUpdate,
      hasBackdrop: true,


      
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);
    });
  }
}
