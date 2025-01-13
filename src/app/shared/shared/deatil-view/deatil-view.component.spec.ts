import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatilViewComponent } from './deatil-view.component';

describe('DeatilViewComponent', () => {
  let component: DeatilViewComponent;
  let fixture: ComponentFixture<DeatilViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeatilViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeatilViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
