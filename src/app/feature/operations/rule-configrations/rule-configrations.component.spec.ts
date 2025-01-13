import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleConfigrationsComponent } from './rule-configrations.component';

describe('RuleConfigrationsComponent', () => {
  let component: RuleConfigrationsComponent;
  let fixture: ComponentFixture<RuleConfigrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleConfigrationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleConfigrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
