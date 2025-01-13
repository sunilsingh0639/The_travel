import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReconComponent } from './add-recon.component';

describe('AddReconComponent', () => {
  let component: AddReconComponent;
  let fixture: ComponentFixture<AddReconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
