import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectUpdatesComponent } from './update-project-updates.component';

describe('UpdateProjectUpdatesComponent', () => {
  let component: UpdateProjectUpdatesComponent;
  let fixture: ComponentFixture<UpdateProjectUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProjectUpdatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
