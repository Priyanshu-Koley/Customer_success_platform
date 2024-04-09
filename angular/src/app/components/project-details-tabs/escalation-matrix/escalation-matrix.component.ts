import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { EscalationType } from '../../../models/escalation-type.model';
import { UpdateEscalationMatrixComponent } from '../../update-modals/update-escalation-matrix/update-escalation-matrix.component';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-escalation-matrix',
  templateUrl: './escalation-matrix.component.html',
  styleUrl: './escalation-matrix.component.scss',
})
export class EscalationMatrixComponent {
  @Input({required: true}) userRoleId: string = '';
  projectId!: string;
  escalationForm: any;
  escalations: any;
  types = EscalationType;
  currentLevels!: any;
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

    this.escalationForm = this.formBuilder.group({
      escalationType: ['', [Validators.required]],
      responsible: ['', [Validators.required]],
    });

    this.getEscalations();
  }

  getEscalations() {
    this.projectService.getEscalations(this.projectId).subscribe(
      (res) => {
        this.escalations = res.items;
        this.currentLevels = this.findMaxLevels();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addEscalation() {
    if (this.escalationForm.valid) {
      const newEscalation = {
        ...this.escalationForm.value,
        level: this.currentLevels[this.escalationForm.value.escalationType] + 1,
        projectId: this.projectId,
      };

      this.projectService.createEscalation(newEscalation).subscribe(
        (res) => {
          console.log(res);
          this.getEscalations();
          this.escalationForm.reset({escalationType: '', responsible: ''});
          this.toast.success({
            detail: 'Success',
            summary: 'Escalation added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Escalation',
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

  deleteEscalation(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteEscalation(id).subscribe(
        (res) => {
          console.log(res);
          this.getEscalations();
          this.toast.success({
            detail: 'Success',
            summary: 'Escalation deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Escalation',
            duration: 4000,
          });
        }
      );
    }
  }

  openUpdateEscalationModal(index: number) {
    const escalationToUpdate = { ...this.escalations[index], projectId: this.projectId };
    const dialogRef = this.dialog.open(UpdateEscalationMatrixComponent, {
      width: '70%',
      data: escalationToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);
      if (result) this.getEscalations();
    });
  }

  convertToPDF(type: string) {
    this.convertToPdf.convertToPDF(
      `${type.toLowerCase()}-escalation-matrix-table`,
      `${type.toLowerCase()}-escalation-matrix-table`
    );
  }

  findMaxLevels(): { [key: string]: number } {
    const maxLevels: { [key: string]: number } = {};

    let types = this.escalations;
    let totalNumberOfTypes = Object.keys(EscalationType).length;

    // Initialize maxLevels with default values
    for (let i = 0; i < totalNumberOfTypes; i++) {
      maxLevels[i.toString()] = -1;
    }

    // Iterate over the array of objects to find max levels for each type
    for (const item of types) {
      const typeKey = item.escalationType.toString();
      if (
        !maxLevels.hasOwnProperty(typeKey) ||
        maxLevels[typeKey] < item.level
      ) {
        maxLevels[typeKey] = item.level;
      }
    }
    return maxLevels;
  }
}