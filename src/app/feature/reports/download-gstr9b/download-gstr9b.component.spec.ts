import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadGstr9bComponent } from './download-gstr9b.component';

describe('DownloadGstr9bComponent', () => {
  let component: DownloadGstr9bComponent;
  let fixture: ComponentFixture<DownloadGstr9bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadGstr9bComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadGstr9bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
