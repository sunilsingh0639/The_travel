import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { OperationService } from 'src/app/core/services/operations/operation.service';
@Component({
    selector: 'app-recon-executions',
    templateUrl: './recon-executions.component.html',
    styleUrls: ['./recon-executions.component.scss']
})
export class ReconExecutionsComponent implements OnInit {
    viewUser() {
        this.router.navigate(['app/users/deatils']);
    }
    hideClient!:boolean
    tableTitle: string = 'Recon Executions';
    showAddNew: boolean = true;
    step: number = 1;
    allexecutionData: any;
    filterData: any[] = [];
    pageNumber: number = 1;
    filterForm!: FormGroup;
    selectedClient: any;
    gstrData: any;
    itcData: any;
    reconsData: any;
    constructor(private _common:CommonService, private router: Router, private renderer: Renderer2, private el: ElementRef,
         private _service: OperationService, private _fb: FormBuilder) { }
    ngOnInit(): void {
      if(this._common.subsType =='INDIVIDUAL_COMPANY'){
        this.hideClient =true
      } else{
        this.hideClient =false
      }
        this.getexecutionData();
        this.initlizeFilterForm();
    };
    viewClient(data: any){
        this.selectedClient = data;
    }
    initlizeFilterForm(){
        this.filterForm = this._fb.group({
            startDate: [''],
            endDate: ['']
        })
        this.filterForm.controls['startDate'].valueChanges.subscribe((res) => {
          if(res){
            this.filterByStartDate(res)
          }
          });
          this.filterForm.controls['endDate'].valueChanges.subscribe((res) => {
            if(res){
              this.filterByEndDate(res)
            }
            });
    }
    getexecutionData(): void {
        this._service.getExecution()
            .subscribe((res: any) => {
                this.allexecutionData = res?.data
                this.filterData = res?.data;
                this.selectedClient = this.filterData;
                this.getGSTRDataByReconId(this.selectedClient.reconId);
            });
    }
getGSTRDataByReconId(id: any): void {
      this._service.getGSTRDataByReconId(id)
          .subscribe((res: any) => {
            this.gstrData = res?.data
          });
  }
getITCDataByReconId(id: any): void {
    this._service.getexecutionById(id)
        .subscribe((res: any) => {
          this.itcData = res?.data
        });
}
getReconOperationByExecutionId(id: any): void {
  this._service.getReconOperationByExecutionId(id)
      .subscribe((res: any) => {
        this.reconsData = res?.data
      });
}
getexecutionById(id: any): void {
  this._service.getexecutionById(id)
      .subscribe((res: any) => {
        this.selectedClient = res?.data
      });
}
    public get pages(): number[] {
        let pages = [];
        if (this.filterData && this.filterData.length > 0) {
          for (let index = 0; index < this.filterData.length / 10; index++) {
            pages.push(index + 1);
          }
          return pages;
        }
        return [];
      }
    
      public get startFrom(): number {
        if (this.pageNumber > 1) {
          return this.pageNumber + 5 > this.pages[this.pages.length - 1]
            ? this.pages.length - 5
            : this.pageNumber - 1;
        }
        return 0;
      }
      public get end(): number {
        if (this.pageNumber > 1) {
          return this.pageNumber + 5 > this.pages[this.pages.length - 1]
            ? this.pages[this.pages.length - 1]
            : this.pageNumber + 5;
        }
        return 5;
      }
      filter(keyword: any) {
        this.filterData = keyword ? this.allexecutionData.filter( (res:any) => { return (res.clientName.includes(keyword) ||res.reconName.includes(keyword) || res.startedOn.includes(keyword)|| res.finishedOn.includes(keyword) || res.status.includes(keyword))}) : this.allexecutionData;
      }
      filterByStartDate(startDate: Date){
       this.filterData = this.allexecutionData.filter((item: { startedOn: string | number | Date; }) => {
            const itemDate = new Date(item.startedOn);
            return this.formatDate(itemDate) == this.formatDate(startDate);
          });
      }
      filterByEndDate(endDate: Date){
        this.filterData = this.allexecutionData.filter((item: { finishedOn: string | number | Date; }) => {
             const itemDate = new Date(item.finishedOn);
             return this.formatDate(itemDate) == this.formatDate(endDate);
           });
       }
      
      public get today() : Date {
        return new Date();
      }
      formatDate(date: Date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const paddedDay = (day < 10) ? `0${day}` : `${day}`;
        const paddedMonth = (month < 10) ? `0${month}` : `${month}`;
        const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;
        return formattedDate;
      }
}
