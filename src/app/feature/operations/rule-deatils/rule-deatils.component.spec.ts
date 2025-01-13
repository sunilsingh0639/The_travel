import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDeatilsComponent } from './rule-deatils.component';

describe('RuleDeatilsComponent', () => {
  let component: RuleDeatilsComponent;
  let fixture: ComponentFixture<RuleDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
