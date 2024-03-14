import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhasesComponent } from './update-phases.component';

describe('UpdatePhasesComponent', () => {
  let component: UpdatePhasesComponent;
  let fixture: ComponentFixture<UpdatePhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePhasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
