import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconDetailComponent } from './recon-detail.component';

describe('ReconDetailComponent', () => {
  let component: ReconDetailComponent;
  let fixture: ComponentFixture<ReconDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
