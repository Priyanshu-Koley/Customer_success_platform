import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProjectsService } from '../../../services/projects.service';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { UpdateEscalationMatrixComponent } from '../../update-modals/update-escalation-matrix/update-escalation-matrix.component';
import { UpdateStakeholdersComponent } from '../../update-modals/update-stakeholders/update-stakeholders.component';
import { Roles } from '../../../models/roles.model';
import { UsersService } from '../../../services/users.service';
import { UserRoleService } from '../../../services/user-role.service';

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrl: './stakeholders.component.scss',
})
export class StakeholdersComponent {
  @Input({ required: true }) userRoleId: string = '';
  projectId!: string;
  stakeholderForm: any;
  stakeholders: any;
  roles = Roles;
  loading: boolean = false;
  users: any[] = [];
  selectedUser: any;
  stakeholderRoleName: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog,
    private convertToPdf: ConvertToPdfService,
    private userService: UsersService,
    private role: UserRoleService
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    // get all users
    this.loading = true;
    const res = this.userService.getAllUser();
    res.then((users) => {
      this.users = users;
      this.loading = false;
    });

    this.stakeholderForm = this.formBuilder.group({
      stakeholderId: ['', Validators.required],
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

  async addStakeholder() {
    if (this.stakeholderForm.valid) {
      let resRole = await this.role.getRole(
        this.stakeholderForm.value.stakeholderId,
        false
      );
      this.stakeholderRoleName = resRole.name;
      
      // get user details
      const resUser = this.userService.getUserById(
        this.stakeholderForm.value.stakeholderId
      );
      resUser.then((user) => {
        console.log(user);
        this.selectedUser = user;
      });


      const newStakeholder = {
        userId: this.stakeholderForm.value.stakeholderId,
        title: this.stakeholderRoleName,
        name: this.selectedUser.name,
        contact: this.selectedUser.email,
        projectId: this.projectId,
      };

      console.log(newStakeholder);
      
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
    const stakeholderToUpdate = {
      ...this.stakeholders[index],
      projectId: this.projectId,
    };
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
