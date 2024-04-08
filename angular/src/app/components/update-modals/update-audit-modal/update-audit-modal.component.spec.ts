import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuditModalComponent } from './update-audit-modal.component';

describe('UpdateAuditModalComponent', () => {
  let component: UpdateAuditModalComponent;
  let fixture: ComponentFixture<UpdateAuditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAuditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAuditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
