import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectBudgetComponent } from './update-project-budget.component';

describe('UpdateProjectBudgetComponent', () => {
  let component: UpdateProjectBudgetComponent;
  let fixture: ComponentFixture<UpdateProjectBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProjectBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
