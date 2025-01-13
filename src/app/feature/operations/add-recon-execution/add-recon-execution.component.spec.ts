import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReconExecutionComponent } from './add-recon-execution.component';

describe('AddReconExecutionComponent', () => {
  let component: AddReconExecutionComponent;
  let fixture: ComponentFixture<AddReconExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReconExecutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReconExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
