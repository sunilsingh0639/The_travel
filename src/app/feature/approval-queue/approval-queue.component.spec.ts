import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalQueueComponent } from './approval-queue.component';

describe('ApprovalQueueComponent', () => {
  let component: ApprovalQueueComponent;
  let fixture: ComponentFixture<ApprovalQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
