import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectResourcesComponent } from './update-project-resources.component';

describe('UpdateProjectResourcesComponent', () => {
  let component: UpdateProjectResourcesComponent;
  let fixture: ComponentFixture<UpdateProjectResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProjectResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
