import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UpdateAuditModalComponent } from '../update-modals/update-audit-modal/update-audit-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../models/project.model';
import { DatePipe } from '@angular/common';
import { ConvertToPdfService } from '../../services/convert-to-pdf.service';
import { Roles } from '../../models/roles.model';
import { UserRoleService } from '../../services/user-role.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  providers: [DatePipe],
})
export class ProjectDetailsComponent {
  projectId: string = '';
  project: Project = {} as Project;
  auditForm: any;
  audits: any;
  PORT:string = "44347";

  tabs: string[] = [
    'Audit History',
    'Version History',
    'Project Budget',
    'Project Overview',
    'Project Stack',
    'Escalation Matrix',
    'Stakeholders',
    'Risk Profile',
    'Phases / Milestone',
    'Sprint Details',
    'Approved Team',
    'Resources',
    'Client Feedback',
    'Project Updates',
    'MoMs'
  ];

  activeTab: number = 1;
  loading: boolean = false;

  userRoleId: string = '';
  userRoleName: string = '';
  roles = Roles;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog,
    private http: HttpClient,
    private datePipe: DatePipe,
    private convertToPdf: ConvertToPdfService,
    private role: UserRoleService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.projectId = this.route.snapshot.params['id'];

    // this.role.userRoleSubject.subscribe((data) => {
    //   this.userRoleId = data.id;
    //   this.userRoleName = data.name;
    // })

    this.userRoleId = this.role.userRoleId;
    this.userRoleName = this.role.userRoleName;

    this.auditForm = this.formBuilder.group({
      reviewedBy: ['', [Validators.required]],
      status: ['', [Validators.required]],
      reviewedSection: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      actionItem: ['', [Validators.required]],
    });

    this.getAuditHistory();

    this.projectService.getProjectById(this.projectId).subscribe(
      (res) => {
        this.project = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAuditHistory() {
    this.projectService.getAuditHistory(this.projectId).subscribe(
      (res) => {
        this.audits = res.items;
          this.loading = false;
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
          this.getAuditHistory();
          this.auditForm.reset();
          this.toast.success({
            detail: 'Success Message',
            summary: 'Audit added successfully',
            duration: 4000,
          });

          this.sendEmail(newAudit);
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

  deleteAudit(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteAuditHistory(id).subscribe(
        (res) => {
          console.log(res);
          this.getAuditHistory();
          this.toast.success({
            detail: 'Success',
            summary: 'Audit deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting audit',
            duration: 4000,
          });
        }
      );
    }
  }

  openUpdateAuditModal(index: number) {
    const auditToUpdate = { ...this.audits[index], projectId: this.projectId };
    const dialogRef = this.dialog.open(UpdateAuditModalComponent, {
      width: '70%',
      data: auditToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);
      if (result) {
        this.sendEmail(result);
        this.getAuditHistory();
      }
    });
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  sendEmail(newAudit: any) {
    newAudit.auditDate = this.datePipe.transform(
      newAudit.auditDate,
      'dd-MM-yy'
    );

    const emailData = {
      name: this.project.clientName,
      toEmails: [this.project.clientEmail],
      changedAudit: newAudit,
    };
    console.log(emailData);
    

    this.http
      .post(
        `https://localhost:${this.PORT}/api/app/email/send-email-on-audit-change`,
        emailData,
        {
          responseType: 'text',
        }
      )
      .subscribe({
        next: (res) => {
          // On successful response
          console.log(res);

          // Show success toast notification
          this.toast.success({
            detail: 'Email sent to client',
            duration: 4000,
          });
        },
        error: (err: any) => {
          // On error response
          // Show error toast notification
          console.log(err);

          this.toast.error({
            detail: 'Failed to send email',
            summary: err.message,
            duration: 4000,
          });
        },
      });
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF(['audit-table'], 'audit-table');
  }

  scrollLeft() {
    const tabsContainer = document.getElementById('tabs-container');
    //@ts-ignore
    tabsContainer.style.justifyContent = 'flex-start';
  }
  scrollRight() {
    const tabsContainer = document.getElementById('tabs-container');
    //@ts-ignore
    tabsContainer.style.justifyContent = 'flex-end';
  }
}
