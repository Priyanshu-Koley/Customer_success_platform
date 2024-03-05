import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { map } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent {
  project: Project = {} as Project;
  projectForm: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    // this.project = this.route.snapshot.params['project'];
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        if (!res.id) this.router.navigate(['/']);
        this.project = res;
      });    
    

    this.projectForm = this.formBuilder.group({
      brief: [
        this.project.brief == null ? '' : this.project.brief,
        Validators.required,
      ],
      purpose: [
        this.project.purpose == null ? '' : this.project.purpose,
        Validators.required,
      ],
      goal: [
        this.project.goal == null ? '' : this.project.goal,
        Validators.required,
      ],
      objective: [
        this.project.objective == null ? '' : this.project.objective,
        Validators.required,
      ],
      totalBudget: [
        this.project.totalBudget == null ? '' : this.project.totalBudget,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  saveOverview() {
    if (this.projectForm.valid) {

      const updatedProject = {
        "name" : this.project.name,
        "description" : this.project.description,
        "projectManagerName" : this.project.projectManagerName,
        "clientName" : this.project.clientName,
        "clientEmail" : this.project.clientEmail,
        "brief" : this.projectForm.value.brief,
        "purpose" : this.projectForm.value.purpose,
        "goal" : this.projectForm.value.goal,
        "objective" : this.projectForm.value.objective,
        "totalBudget" : this.projectForm.value.totalBudget.toString(),
        "membersAssociated" : this.project.membersAssociated,
        "status" : this.project.status
      };
      

      this.projectService.updateProject(this.project.id,updatedProject).subscribe((res) => {
        console.log(res);    
        this.toast.success({
          detail: 'Updated',
          summary: 'Updated project overview',
          duration: 4000,
        }); 
        this.router.navigate(['/dashboard']);
      },
      (err)=>{
        console.log(err);
        this.toast.error({
          detail: 'Error',
          summary: 'Project overview updation failed!',
          duration: 4000,
        });
      })


    }
    else
    {
      this.toast.error({
        detail: 'Invalid input',
        summary: 'Please fill all the fields with valid data !',
        duration: 4000,
      });
    }
    
  }
}
