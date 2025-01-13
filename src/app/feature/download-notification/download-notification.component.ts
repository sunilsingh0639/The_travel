import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-download-notification',
  templateUrl: './download-notification.component.html',
  styleUrls: ['./download-notification.component.scss']
})
export class DownloadNotificationComponent implements OnInit {
  allDownloads: any;

  constructor( private notifiDownload : NotificationService){}

ngOnInit(): void {
  this.downloadNotification();
}

downloadNotification(){
  this.notifiDownload.downloadFileExportes()
  .subscribe((res:any) =>{
    console.log(res)
    this.allDownloads = res
  })
}

}
