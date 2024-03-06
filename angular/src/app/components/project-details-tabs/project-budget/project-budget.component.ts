import { Component } from '@angular/core';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrl: './project-budget.component.scss'
})
export class ProjectBudgetComponent {

  projectId!: string;
  versionForm: any;
  versions: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.versionForm = this.formBuilder.group({
      version: ['', [Validators.required,Validators.min(1)]],
      type: ['', [Validators.required]],
      change: ['', [Validators.required]],
      changeReason: ['', [Validators.required]],
      createdBy: ['', [Validators.required]],
      revisionDate: ['', [Validators.required]],
      approvalDate: ['', [Validators.required]],
      approvedBy: ['', [Validators.required]],
    });

    this.getVersionHistory();
  }

  getVersionHistory() {
    this.projectService.getVersionHistory(this.projectId).subscribe(
      (res) => {
        this.versions = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addVersion() {
    if (this.versionForm.valid) {
      const newVersion = {...this.versionForm.value,'versionDate' : new Date(),'projectId':this.projectId};
        

      this.projectService.createVersionHistory(newVersion).subscribe(
        (res) => {
          console.log(res);
          this.getVersionHistory();
          this.versionForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Version added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding version',
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

  deleteVersion(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete ?");
    if(confirmDelete)
    {
      this.projectService.deleteVersionHistory(id).subscribe(
        (res) => {
          console.log(res);
          this.getVersionHistory();
          this.toast.success({
            detail: 'Success',
            summary: 'Version deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting version',
            duration: 4000,
          });
        }
      );

    }
  }

}
