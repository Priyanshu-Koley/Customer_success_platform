import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRiskProfileComponent } from './update-risk-profile.component';

describe('UpdateRiskProfileComponent', () => {
  let component: UpdateRiskProfileComponent;
  let fixture: ComponentFixture<UpdateRiskProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRiskProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRiskProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
