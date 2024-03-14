import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectScopeStackComponent } from './update-project-scope-stack.component';

describe('UpdateProjectScopeStackComponent', () => {
  let component: UpdateProjectScopeStackComponent;
  let fixture: ComponentFixture<UpdateProjectScopeStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProjectScopeStackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectScopeStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
