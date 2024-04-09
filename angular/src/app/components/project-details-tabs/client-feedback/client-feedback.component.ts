import { Component, Input } from '@angular/core';
import { FeedbackType } from '../../../models/feedback-type.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConvertToPdfService } from '../../../services/convert-to-pdf.service';
import { ProjectsService } from '../../../services/projects.service';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.scss'
})
export class ClientFeedbackComponent {
  @Input({required: true}) userRoleId: string = '';
  projectId!: string;
  feedbackForm: any;
  feedbacks: any;
  feedbackTypes = FeedbackType;
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

    this.feedbackForm = this.formBuilder.group({
      feedbackDate: ['', [Validators.required]],
      feedbackType: ['', [Validators.required]],
      details: ['', [Validators.required]],
      actionTaken: ['', [Validators.required]],
      closureDate: ['', [Validators.required]],
    });

    this.getFeedbacks();
  }

  getFeedbacks() {
    this.projectService.getFeedbacks(this.projectId).subscribe(
      (res) => {
        this.feedbacks = res.items;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addFeedback() {
    if (this.feedbackForm.valid) {
      const newFeedback = {
        ...this.feedbackForm.value,
        projectId: this.projectId,
      };

      this.projectService.createFeedback(newFeedback).subscribe(
        (res) => {
          console.log(res);
          this.getFeedbacks();
          this.feedbackForm.reset({feedbackDate : '', feedbackType: '', details: '', actionTaken: '', closureDate: ''});
          this.toast.success({
            detail: 'Success',
            summary: 'Feedback added successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error adding Feedback',
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

  deleteFeedback(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete ?');
    if (confirmDelete) {
      this.projectService.deleteFeedback(id).subscribe(
        (res) => {
          console.log(res);
          this.getFeedbacks();
          this.toast.success({
            detail: 'Success',
            summary: 'Feedback deleted successfully',
            duration: 4000,
          });
        },
        (err) => {
          console.log(err);
          this.toast.error({
            detail: 'Error',
            summary: 'Error deleting Feedback',
            duration: 4000,
          });
        }
      );
    }
  }

  convertToPDF() {
    this.convertToPdf.convertToPDF('feedback-table', 'feedback-table');
  }

  getFeedbackTypes(intType: number)
  {
    return (this.feedbackTypes as any)[intType];
  }
}