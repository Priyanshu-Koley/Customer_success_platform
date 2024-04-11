import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { ProjectsService } from '../../../services/projects.service';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-meeting-minute',
  templateUrl: './meeting-minute.component.html',
  styleUrl: './meeting-minute.component.scss',
})
export class MeetingMinuteComponent {
  @Input({required: true}) userRoleId: string = '';
  projectId!: string;
  momForm: any;
  moms: any;
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

    this.momForm = this.formBuilder.group({
      meetingDate: ['', [Validators.required]],
      durationInMinutes: ['', [Validators.required, Validators.min(1)]],
      moMLink: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    });

    this.getMoms();
  }

  getMoms() {
    this.projectService.getMoms(this.projectId).subscribe(
      (res) => {
        this.moms = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addMom() {
    if (this.momForm.valid) {
      const newMom = {
        ...this.momForm.value,
        projectId: this.projectId,
      };

      this.projectService.createMom(newMom).subscribe(
        (res) => {
          console.log(res);
          this.getMoms();
          this.momForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'MoM added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding MoM',
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

  deleteMom(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteMom(id).subscribe(
        (res) => {
          console.log(res);
          this.getMoms();
          this.toast.success({
            detail: 'Success',
            summary: 'MoM deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting MoM',
            duration: 4000,
          });
        }
      );
    }
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF(['mom-table'], 'mom-table');
  }
}