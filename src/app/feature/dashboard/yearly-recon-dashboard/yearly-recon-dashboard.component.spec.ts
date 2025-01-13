import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyReconDashboardComponent } from './yearly-recon-dashboard.component';

describe('YearlyReconDashboardComponent', () => {
  let component: YearlyReconDashboardComponent;
  let fixture: ComponentFixture<YearlyReconDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlyReconDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyReconDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
