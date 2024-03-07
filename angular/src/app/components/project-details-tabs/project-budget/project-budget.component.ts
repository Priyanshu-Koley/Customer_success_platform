import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrl: './project-budget.component.scss',
})
export class ProjectBudgetComponent {
  projectId!: string;
  budgetForm: any;
  budgets: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.budgetForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      durationInMonths: ['', [Validators.required]],
      budgetedHours: ['', [Validators.required]],
    });

    this.getBudget();
  }

  getBudget() {
    this.projectService.getBudget(this.projectId).subscribe(
      (res) => {
        this.budgets = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addBudget() {
    if (this.budgetForm.valid) {
      const newBudget = {
        ...this.budgetForm.value,
        projectId: this.projectId,
      };

      this.projectService.createBudget(newBudget).subscribe(
        (res) => {
          console.log(res);
          this.getBudget();
          this.budgetForm.reset();
          this.toast.success({
            detail: 'Success',
            summary: 'Budget added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding budget',
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

  deleteBudget(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteBudget(id).subscribe(
        (res) => {
          console.log(res);
          this.getBudget();
          this.toast.success({
            detail: 'Success',
            summary: 'Budget deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting budget',
            duration: 4000,
          });
        }
      );
    }
  }
}
