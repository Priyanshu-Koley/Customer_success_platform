import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEscalationMatrixComponent } from './update-escalation-matrix.component';

describe('UpdateEscalationMatrixComponent', () => {
  let component: UpdateEscalationMatrixComponent;
  let fixture: ComponentFixture<UpdateEscalationMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEscalationMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEscalationMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
