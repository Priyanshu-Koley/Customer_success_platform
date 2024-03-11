import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { EscalationType } from '../../../models/escalation-type.model';

@Component({
  selector: 'app-escalation-matrix',
  templateUrl: './escalation-matrix.component.html',
  styleUrl: './escalation-matrix.component.scss',
})
export class EscalationMatrixComponent {
  projectId!: string;
  escalationForm: any;
  escalations: any;
  types = EscalationType;
  currentLevels!: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog,
    private convertToPdf: ConvertToPdfService
  ) { }

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
        level: this.currentLevels[this.escalationForm.value.escalationType]+1,
        projectId: this.projectId,
      };
      

      this.projectService.createEscalation(newEscalation).subscribe(
        (res) => {
          console.log(res);
          this.getEscalations();
          this.escalationForm.reset();
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

  convertToPDF() {
    this.convertToPdf.convertToPDF('escalation-tables');
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
      if (!maxLevels.hasOwnProperty(typeKey) || maxLevels[typeKey] < item.level) {
        maxLevels[typeKey] = item.level;
      }
    }
    return maxLevels;
    
  }

}