import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationList!: any;

  constructor(private _service: NotificationService) { }


  ngOnInit(): void {
    this.notification()
  }

  tableData: any[] = [

    { File: "S1", Count: 56565, Amount: 57685, Tax: 67545, UMCount: 56765, UMAmount: 576775, UMTax: 6745, TCount: 56665, TAmount: 57675, TTax: 6764, },
    { File: "S2", Count: 565, Amount: 557685, Tax: 67745, UMCount: 5665, UMAmount: 5785, UMTax: 676745, TCount: 5765, TAmount: 56885, TTax: 657645, },
    { File: "S3", Count: 567865, Amount: 578685, Tax: 6778645, UMCount: 56765, UMAmount: 5785, UMTax: 677645, TCount: 57765, TAmount: 57685, TTax: 677845, },

  ]
  dataForITC: any[] = [
    { Invoice: "29AABCF0520E1Z7", Gstin: "29AABCF0520E1Z7", Amount: 5544, Tax: 6755, },
    { Invoice: "29AABCF0520E1Z7", Gstin: "29AABCF0520E1Z7", Amount: 56544, Tax: 565, },
    { Invoice: "29AABCF0520E1Z7", Gstin: "29AABCF0520E1Z7", Amount: 5544, Tax: 5667, },
  ]
  dataForGSTR2B: any[] = [
    { Invoice: "29AABCF0520E1Z7", Gstin: "29AABCF0520E1Z7", Amount: 6544, Tax: 5655, },
    { Invoice: "29AABCF0520E1Z7", Gstin: "29AABCF0520E1Z7", Amount: 5644, Tax: 56567, },
    { Invoice: "29AABCF0520E1Z7", Gstin: "29AABCF0520E1Z7", Amount: 5644, Tax: 56567, },
  ]


  notification() {

    this._service.notificationList(10)
      .subscribe((res: any) => {
        console.log(res)
        this.notificationList = res.uiNotifications
      })
  }

}
