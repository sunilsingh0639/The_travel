import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadNotificationComponent } from './download-notification.component';

describe('DownloadNotificationComponent', () => {
  let component: DownloadNotificationComponent;
  let fixture: ComponentFixture<DownloadNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
