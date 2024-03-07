import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScopeStackComponent } from './project-scope-stack.component';

describe('ProjectScopeStackComponent', () => {
  let component: ProjectScopeStackComponent;
  let fixture: ComponentFixture<ProjectScopeStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectScopeStackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectScopeStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
