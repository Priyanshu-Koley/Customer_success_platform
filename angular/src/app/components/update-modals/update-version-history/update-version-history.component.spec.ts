import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVersionHistoryComponent } from './update-version-history.component';

describe('VersionHistoryComponent', () => {
  let component: UpdateVersionHistoryComponent;
  let fixture: ComponentFixture<UpdateVersionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateVersionHistoryComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(UpdateVersionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
