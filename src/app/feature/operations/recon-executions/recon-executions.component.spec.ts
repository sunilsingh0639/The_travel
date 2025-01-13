import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconExecutionsComponent } from './recon-executions.component';

describe('ReconExecutionsComponent', () => {
  let component: ReconExecutionsComponent;
  let fixture: ComponentFixture<ReconExecutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconExecutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconExecutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
