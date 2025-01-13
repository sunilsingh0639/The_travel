import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualMatchComponent } from './manual-match.component';

describe('ManualMatchComponent', () => {
  let component: ManualMatchComponent;
  let fixture: ComponentFixture<ManualMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
