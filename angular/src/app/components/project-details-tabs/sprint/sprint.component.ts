import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { SprintStatus } from '../../../models/sprint-status.model';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss',
})
export class SprintComponent {
  @Input({required: true}) userRoleId: string = '';
  projectId!: string;
  sprintForm: any;
  sprints: any;
  sprintStatus = SprintStatus;
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

    this.sprintForm = this.formBuilder.group({
      sprintNumber: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    });

    this.getSprints();
  }

  getSprints() {
    this.projectService.getSprints(this.projectId).subscribe(
      (res) => {
        this.sprints = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addSprint() {
    if (this.sprintForm.valid) {
      const newSprint = {
        ...this.sprintForm.value,
        projectId: this.projectId
      };

      this.projectService.createSprint(newSprint).subscribe(
        (res) => {
          console.log(res);
          this.getSprints();
          this.sprintForm.reset({sprintNumber: '', startDate: '', endDate: '', status: '', comments: ''});
          this.toast.success({
            detail: 'Success',
            summary: 'Sprint added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Sprint',
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

  deleteSprint(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteSprint(id).subscribe(
        (res) => {
          console.log(res);
          this.getSprints();
          this.toast.success({
            detail: 'Success',
            summary: 'Sprint deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Sprint',
            duration: 4000,
          });
        }
      );
    }
  }

  getSprintStatus(intStatus: number) {
    return (SprintStatus as any)[intStatus];
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF(
      ['version-history-table'],
      'version-history-table'
    );
  }
}