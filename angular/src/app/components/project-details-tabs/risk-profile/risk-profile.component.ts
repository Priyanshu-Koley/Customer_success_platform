import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrl: './risk-profile.component.scss',
})
export class RiskProfileComponent {
  projectId!: string;
  riskForm: any;
  risks: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.riskForm = this.formBuilder.group({
      riskType: ['', [Validators.required]],
      description: ['', [Validators.required]],
      severity: ['', [Validators.required]],
      impact: ['', [Validators.required]],
      remedialSteps: ['', [Validators.required]],
      status: ['', [Validators.required]],
      closureDate: ['', [Validators.required]],
    });

    this.getRisks();
  }

  getRisks() {
    this.projectService.getRisks(this.projectId).subscribe(
      (res) => {
        this.risks = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addRisk() {
    if (this.riskForm.valid) {
      const newRisk = {
        ...this.riskForm.value,
        projectId: this.projectId,
      };

      this.projectService.createRisk(newRisk).subscribe(
        (res) => {
          console.log(res);
          this.getRisks();
          this.riskForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Risk added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Risk',
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

  deleteRisk(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteRisk(id).subscribe(
        (res) => {
          console.log(res);
          this.getRisks();
          this.toast.success({
            detail: 'Success',
            summary: 'Risk deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Risk',
            duration: 4000,
          });
        }
      );
    }
  }
}
