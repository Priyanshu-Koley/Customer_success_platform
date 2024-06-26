import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { UpdateApprovedTeamComponent } from '../../update-modals/update-approved-team/update-approved-team.component';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-approved-team',
  templateUrl: './approved-team.component.html',
  styleUrl: './approved-team.component.scss',
})
export class ApprovedTeamComponent {
  @Input({required: true}) userRoleId: string = '';
  projectId!: string;
  teamForm: any;
  teams: any = [];
  phaseNo: number = 0;
  phases: number[] = [];
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

    this.teamForm = this.formBuilder.group({
      numberOfResources: ['', [Validators.required, Validators.min(1)]],
      role: ['', [Validators.required]],
      availability: ['', [Validators.required, Validators.min(1)]],
      duration: ['', [Validators.required]],
    });

    this.getTeams();
  }

  getTeams() {
    this.projectService.getTeams(this.projectId).subscribe(
      (res) => {
        this.teams = res.items;
        this.phaseNo = this.getCurrentPhase();
        this.getPhases();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addTeam() {
    if (this.teamForm.valid) {
      const newTeam = {
        ...this.teamForm.value,
        phaseNumber: this.phaseNo,
        projectId: this.projectId,
      };

      this.projectService.createTeam(newTeam).subscribe(
        (res) => {
          console.log(res);
          this.getTeams();
          this.teamForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Approved team added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Approved team',
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

  deleteTeam(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteTeam(id).subscribe(
        (res) => {
          console.log(res);
          this.getTeams();
          this.toast.success({
            detail: 'Success',
            summary: 'Approved team deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Approved team',
            duration: 4000,
          });
        }
      );
    }
  }

  openUpdateTeamModal(index: number) {
    const teamToUpdate = { ...this.teams[index], projectId: this.projectId };
    const dialogRef = this.dialog.open(UpdateApprovedTeamComponent, {
      width: '70%',
      data: teamToUpdate,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Form Data:', result);

      // this.sendEmail(result);
      if (result) this.getTeams();
    });
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF(
      this.phases.map((phase): string => {
        return `approved-team-table-${phase}`;
      }),
      'approved-team-table',
      this.phases.length
    );
  }

  addPhase() {
    this.phaseNo++;
  }

  getCurrentPhase() {
    if (this.teams.length === 0) return 0; // Return undefined if array is empty

    return this.teams.reduce((max: number, team: { [x: string]: any }) => {
      return team['phaseNumber'] > max ? team['phaseNumber'] : max;
    }, this.teams[0]['phaseNumber']);
  }
  getPhases() {
    this.phases = [];
    for (let i = 1; i <= this.phaseNo; i++) {
      this.phases.push(i);
    }
  }
}
