import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuditLogsService } from 'src/app/core/services/audit-logs/audit-logs.service';
import { AuditLogListHeaders } from 'src/app/modal/table-headers';
import { ListViewComponent } from 'src/app/shared/shared/list-view/list-view.component';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {
  headers: any[] = [];
  responseData: any;
  auditlist: any;
  searchKey: string = '';
  pageNumber: number = 1;
  recordsTotal: number = 0;
  numberOfPages: any[] = [];
  @ViewChild(ListViewComponent) listView!: ListViewComponent;

  constructor(private router: Router, private auditlogService: AuditLogsService) {
    this.headers = AuditLogListHeaders;
  }

  ngOnInit(): void {
    this.getAuditLogData();
  }

  getAuditLogData() {
    this.auditlist = [];
    this.auditlogService.getAuditLogData(this.pageNumber,this.searchKey)
      .subscribe((res: any) => {
        this.recordsTotal = res.recordsTotal;
        this.auditlist = [...res.data];
        this.responseData = [...res.data];
        if (this.recordsTotal > 0 && this.pageNumber == 1) {
          for (let index = 0; index < this.recordsTotal / 10; index++) {
            this.numberOfPages.push(index + 1);
          }
        }
      })
  }

  filter(keyword: any) {
    this.searchKey = keyword;
    this.pageNumber = 1;
    this.getAuditLogData();
    //this.auditlist = keyword ? this.responseData.filter((res:any) =>{ return  res?.performedBy.includes(keyword)}) : this.responseData;
  }
  pagination(page: number) {
    this.pageNumber = page;
    this.getAuditLogData();
  }

}
