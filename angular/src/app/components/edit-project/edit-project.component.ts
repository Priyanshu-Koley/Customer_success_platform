import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { map } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Roles } from '../../models/roles.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  project: Project = {} as Project;
  projectForm!: FormGroup;
  @Input() projectId: string = '';
  @Input({required:true}) userRoleId: string = '';
  roles = Roles;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {}

  ngOnInit() {

    this.projectForm = this.formBuilder.group({
      brief: ['', Validators.required],
      purpose: ['', Validators.required],
      goal: ['', Validators.required],
      objective: ['', Validators.required],
      status: ['', Validators.required],
      totalBudget: ['', [Validators.required, Validators.min(1)]],
    });

    // this.project = this.route.snapshot.params['project'];
    
    if (window.history.state && window.history.state.id) {
      this.route.paramMap
        .pipe(map(() => window.history.state))
        .subscribe((res) => {
          if (!res.id) this.router.navigate(['/']);
          this.project = res;
          this.populateForm();
        });
    } else {
      this.projectService.getProjectById(this.projectId).subscribe(
        (res) => {
          this.project = res;
          this.populateForm();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  private populateForm() {
    this.projectForm.patchValue({
      brief: this.project.brief || '',
      purpose: this.project.purpose || '',
      goal: this.project.goal || '',
      objective: this.project.objective || '',
      status: this.project.status || '',
      totalBudget: this.project.totalBudget || '',
    });
  }

  saveOverview() {
    if (this.projectForm.valid) {

      const updatedProject = {
        ...this.project,
        brief: this.projectForm.value.brief,
        purpose: this.projectForm.value.purpose,
        goal: this.projectForm.value.goal,
        objective: this.projectForm.value.objective,
        totalBudget: this.projectForm.value.totalBudget.toString(),
        status: this.projectForm.value.status,
      };

      this.projectService
        .updateProject(this.project.id, updatedProject)
        .subscribe(
          (res) => {
            console.log(res);
            this.toast.success({
              detail: 'Updated',
              summary: 'Updated project overview',
              duration: 4000,
            });
            if (window.history.state && window.history.state.id) 
              this.router.navigate(['/dashboard']);
          },
          (err) => {
            console.log(err);
            this.toast.error({
              detail: 'Error',
              summary: 'Project overview updation failed!',
              duration: 4000,
            });
          }
        );
    } else {
      this.toast.error({
        detail: 'Invalid input',
        summary: 'Please fill all the fields with valid data !',
        duration: 4000,
      });
    }
  }
}
