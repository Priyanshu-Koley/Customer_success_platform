import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApprovedTeamComponent } from './update-approved-team.component';

describe('UpdateApprovedTeamComponent', () => {
  let component: UpdateApprovedTeamComponent;
  let fixture: ComponentFixture<UpdateApprovedTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateApprovedTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateApprovedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
