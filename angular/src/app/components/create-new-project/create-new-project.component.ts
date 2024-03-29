import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrl: './create-new-project.component.scss',
})
export class CreateNewProjectComponent {
  projectForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', Validators.required],
      projectManagerName: ['', Validators.required],
      membersAssociated: ['', Validators.required],
    });
  }

  createProject() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe(
        (response) => {
          this.toast.success({
            detail: 'Created',
            summary: 'Project created successfully',
            duration: 4000,
          });
          console.log('Project created successfully:', response);
          this.router.navigate(['/dashboard']);
          // Handle success response
        },
        (error) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Failed to create project',
            duration: 4000,
          });
          console.error('Failed to create project:', error);
          // Handle error response
        }
      );
    } else {
      alert('Invalid Input');
    }
  }
}
