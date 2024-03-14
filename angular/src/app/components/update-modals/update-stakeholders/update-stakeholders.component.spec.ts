import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStakeholdersComponent } from './update-stakeholders.component';

describe('UpdateStakeholdersComponent', () => {
  let component: UpdateStakeholdersComponent;
  let fixture: ComponentFixture<UpdateStakeholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStakeholdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
