import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerListComponent } from './admin-list.component';

describe('ProjectManagerListComponent', () => {
  let component: ProjectManagerListComponent;
  let fixture: ComponentFixture<ProjectManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectManagerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
