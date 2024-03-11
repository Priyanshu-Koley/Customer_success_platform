import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { MilestoneOrPhaseStatus } from '../../../models/milestone-phase-status.model';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrl: './phases.component.scss',
})
export class PhasesComponent {
  projectId!: string;
  phaseForm: any;
  phases: any;
  phaseStatus = MilestoneOrPhaseStatus;

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

    this.phaseForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      approvalDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      revisedCompletionDate: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    });

    this.getPhases();
  }

  getPhases() {
    this.projectService.getPhases(this.projectId).subscribe(
      (res) => {
        this.phases = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addPhase() {
    if (this.phaseForm.valid) {
      const newPhase = {
        ...this.phaseForm.value,
        projectId: this.projectId,
      };

      this.projectService.createPhase(newPhase).subscribe(
        (res) => {
          console.log(res);
          this.getPhases();
          this.phaseForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Phase added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Phase',
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

  deletePhase(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deletePhase(id).subscribe(
        (res) => {
          console.log(res);
          this.getPhases();
          this.toast.success({
            detail: 'Success',
            summary: 'Phase deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Phase',
            duration: 4000,
          });
        }
      );
    }
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF('phase-table');
  }

  getPhaseStatus(intStatus: number)
  {
    return (this.phaseStatus as any)[intStatus];
  }
}