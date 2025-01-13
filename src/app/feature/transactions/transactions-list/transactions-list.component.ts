import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MyDialogComponent } from '../modal/my-dialog.component';
import { TransactionService } from '../transaction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
declare var $: any;

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})


export class TransactionsListComponent implements OnInit {
  selectedTab: string = 'all';
  hideClient!: boolean
  gstrDataList: any[] = [];
  itcDataList: any[] = [];
  allITCList: any;
  allGSTRList: any;
  allClients: any;
  allRecons: any;
  fileById: any;
  reconForm!: FormGroup;
  filterForm!: FormGroup;
  pageNumber: number = 1;
  selectedOption: string = '';
  listOfReconMatchingVoGSTR: any[] = [];
  listOfReconMatchingVoITC: any[] = [];
  constructor(public dialog: MatDialog, private _service: TransactionService, private _spinner: SpinnerService,
    private _fb: FormBuilder, private _common: CommonService, private toast: ToastrService) { }


  ngOnInit(): void {
    if (this._common.subsType == 'INDIVIDUAL_COMPANY') {
      this.hideClient = true
    } else {
      this.hideClient = false

    }



    this.getClients();
    this.initializereconForm();
    this.initializeFilterForm()
    $('.select2').select2();

  }
  initializeFilterForm() {
    const lastMonth = this.getLastMonthRange;
    this.filterForm = this._fb.group({
      startDate: [lastMonth.start],
      endDate: [lastMonth.end],
      gstin: [''],
      supplierName: [''],
      amount: [''],
      amountTo: [''],
      status: [''],
      invoiceNumber: ['']
    });
    this.filter();
  }

  get getLastMonthRange() {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();

    // Calculate the previous month and year
    var previousMonth = currentMonth - 1;
    var previousYear = currentYear;

    if (previousMonth < 0) {
      previousMonth = 11; // December (0-based index)
      previousYear--;
    }

    // Get the first and last day of the previous month
    var firstDay = new Date(previousYear, previousMonth, 1);
    var lastDay = new Date(currentYear, currentMonth, 0);

    return {
      start: firstDay,
      end: lastDay
    };
  }
  initializereconForm() {
    this.reconForm = this._fb.group({
      clientId: ['',],
      reconId: ['',]
    });

    this.reconForm.controls['clientId'].valueChanges.subscribe((res) => {
      this._service.getReconsbyClientId(res).subscribe((res: any) => {
        this.allRecons = res.data;
      });
    });
    this.reconForm.controls['reconId'].valueChanges.subscribe((res) => {
      this.filter();
    });

  }
  filterRecon(client: string) {
    this._service.getReconsbyClientId(client).subscribe((res: any) => {
      this.allRecons = res.data;
    });
  }

  onChanges() {
    console.log(this.allITCList)
    if (this.selectedTab == 'Knocked') {
      this.itcDataList = this.allITCList.filter((item: any) => item.status === "KNOCK_OFF")
      this.gstrDataList = this.allGSTRList.filter((item: any) => item.status === "KNOCK_OFF")
    }
    else if (this.selectedTab == 'unReconciled') {

      this.itcDataList = this.allITCList.filter((item: any) => item.status === "UNRECONCILED")
      this.gstrDataList = this.allGSTRList.filter((item: any) => item.status === "UNRECONCILED")
      console.log(this.allITCList)
    }

    else if (this.selectedTab == 'Reconciled') {

      this.itcDataList = this.allITCList.filter((item: any) => item.status === "RECONCILED")
      this.gstrDataList = this.allGSTRList.filter((item: any) => item.status === "RECONCILED")

    }
    else if (this.selectedTab == 'Duplicate') {
      this.itcDataList = this.allITCList.filter((item: any) => item.status === "DUPLICATE")
      this.gstrDataList = this.allGSTRList.filter((item: any) => item.status === "DUPLICATE")

    }

    else if (this.selectedTab == 'IncorrectData') {
      this.itcDataList = this.allITCList.filter((item: any) => item.status === "DUPLICATE_MATCH_KNOCK_OFF")
      this.gstrDataList = this.allGSTRList.filter((item: any) => item.status === "DUPLICATE_MATCH_KNOCK_OFF")

    }

    else if (this.selectedTab == 'all') {
      this.itcDataList = this.allITCList
      this.gstrDataList = this.allGSTRList

    }


    else {

      this.itcDataList = this.allITCList
      this.gstrDataList = this.allGSTRList
    }
  }


  // selectedTab: string = 'All';
  selectedType: string = 'ITC';



  gstrSelectedData: any = [];
  itcSelectedData: any = [];
  dataToMatch: any = [];

  updateGSTRSelectedItems() {
    // this.gstrSelectedData = this.gstrDataArray.filter(item => item.selected);
    console.log('this.gstrSelectedData ', this.gstrSelectedData);
  }
  updateITCSelectedItems() {
    // this.itcSelectedData = this.itcDataArray.filter(item => item.selected);
    console.log('this.itcSelectedData ', this.itcSelectedData);
  }

  matchData() {
    if (this.gstrSelectedData.length > 0 && this.itcSelectedData.length > 0) {

      const gstrTotal = this.gstrSelectedData.reduce((sum: any, item: { invoiceValue: any; }) => parseFloat(sum) + parseFloat(item.invoiceValue), 0);
      const itcTotal = this.itcSelectedData.reduce((sum: any, item: { invoiceValue: any; }) => parseFloat(sum) + parseFloat(item.invoiceValue), 0);
      console.log(gstrTotal, '   ', itcTotal);

      this.dataToMatch.push({
        gstr: this.gstrSelectedData,
        gstrTotal: gstrTotal,
        itc: this.itcSelectedData,
        itcTotal: itcTotal,
        selected: true
      });
      console.log('dataToMatch ', this.dataToMatch.length);
      // this.gstrDataArray.map(data => data.selected ? data.selected = false : '');
      // this.itcDataArray.map(data => data.selected ? data.selected = false : '');

    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      listOfReconMatchingVoITC : this.listOfReconMatchingVoITC,
      listOfReconMatchingVoGSTR : this.listOfReconMatchingVoGSTR
    }
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '70%';
    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result && result == 'submit'){
        this.listOfReconMatchingVoGSTR.forEach(element => {
          element.type = 'GSTR2B'
        });
        this.listOfReconMatchingVoITC.forEach(element => {
          element.type = 'ITC'
        });
        const reqData = {
          listOfMatchingRequestVo: [{
            listOfReconMatchingVoITC: this.listOfReconMatchingVoITC,
            listOfReconMatchingVoGSTR: this.listOfReconMatchingVoGSTR  
          }]
        }
        this._spinner.show();
        this._service.submitReview(reqData)
        .subscribe((res: any) => {
          this._spinner.hide();
        });
      }
    });
  }



  gstrData() {

    this._service.gstrTransaction()
      .subscribe((res: any) => {

        console.log(res);
        this.gstrDataList = res?.data;

        this.allGSTRList = res?.data
      });
  }

  itcData() {

    this._service.itcTransaction()
      .subscribe((res: any) => {
        console.log(res);
        this.itcDataList = res?.data
        this.allITCList = res?.data
      });
  }

  getClients() {
    this._service.getClients().subscribe((res: any) => {
      console.log(res.data);
      this.allClients = res.data;
    });
  }


  endDateApply() {
    if (this.selectedType == 'ITC') {
      this.filter();
    } else {
      this.filter();
    }
  }
  filter() {
    var i = 0;
    var j = 0;
    let reqData: any = '';
    if (this.filterForm.controls['startDate'].value) {
      reqData = `start=${this.pageNumber}&length=10&columns[${i++}][data]=startDate&columns[${j++}][search][value]=${this.formatDate(this.filterForm.controls['startDate'].value)}`;
    }
    if (this.filterForm.controls['endDate'].value) {
      reqData = reqData + `&columns[${i++}][data]=endDate&columns[${j++}][search][value]=${this.formatDate(this.filterForm.controls['endDate'].value)}`;
    }
    if (this.filterForm.controls['gstin'].value) {
      reqData = reqData + `&columns[${i++}][data]=gstin&columns[${j++}][search][value]=${this.filterForm.controls['gstin'].value}`
    }
    if (this.filterForm.controls['supplierName'].value) {
      reqData = reqData + `&columns[${i++}][data]=supplierName&columns[${j++}][search][value]=${this.filterForm.controls['supplierName'].value}`
    }
    if (this.filterForm.controls['amount'].value) {
      reqData = reqData + `&columns[${i++}][data]=fromInvoiceValue&columns[${j++}][search][value]=${this.filterForm.controls['amount'].value}`
    }
    if (this.filterForm.controls['amountTo'].value) {
      reqData = reqData + `&columns[${i++}][data]=toInvoiceValue&columns[${j++}][search][value]=${this.filterForm.controls['amountTo'].value}`
    }
    if (this.filterForm.controls['invoiceNumber'].value) {
      reqData = reqData + `&columns[${i++}][data]=invoiceNumber&columns[${j++}][search][value]=${this.filterForm.controls['invoiceNumber'].value}`;
    }
    if (this.selectedTab == 'Reconciled') {
      reqData = reqData + `&columns[${i++}][data]=status&columns[${j++}][search][value]=RECONCILED`;
    }
    if (this.selectedTab == 'unReconciled') {
      reqData = reqData + `&columns[${i++}][data]=status&columns[${j++}][search][value]=UNRECONCILED`;
    }
    if (this.selectedTab == 'Knocked') {
      reqData = reqData + `&columns[${i++}][data]=status&columns[${j++}][search][value]=KNOCK_OFF`;
    }
    if (this.selectedTab == 'Duplicate') {
      reqData = reqData + `&columns[${i++}][data]=status&columns[${j++}][search][value]=DUPLICATE`;
    }
   
    if (this.reconForm.controls['reconId'].value) {
      reqData = reqData + `&columns[${i++}][data]=recon_id&columns[${j++}][search][value]=${this.reconForm.controls['reconId'].value}`;
    }

    if (this.selectedType == 'ITC') {
      if (this.selectedTab == 'IncorrectData') {
        this._service.getItcInvalidTrans(reqData)
          .subscribe((res: any) => {
            this.itcDataList = res?.data;
           });
      }
      else {
        this._service.itcFilterTransaction(reqData)
          .subscribe((res: any) => {
            this.itcDataList = res?.data
            this.allITCList = res?.data
           
          });
      }
    } else {
      if (this.selectedTab == 'IncorrectData') {
        this._service.getInvalidGstrTrans(reqData)
          .subscribe((res: any) => {
            res?.data.forEach((element: any) => {
              element.taxableValue = element.taxableValue == null ? '-' : element.taxableValue;
            });
            this.gstrDataList = res?.data;
            this.allGSTRList = res?.data;
           });
      }
      else {
        this._service.gstrFilterTransaction(reqData)
          .subscribe((res: any) => {
            this.gstrDataList = res?.data;
            this.allGSTRList = res?.data;
           
          });
      }
    }
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

  public get pages(): number[] {
    let pages = [];
    if (this.gstrDataList && this.gstrDataList.length > 0) {
      for (let index = 0; index < this.gstrDataList.length / 10; index++) {
        pages.push(index + 1);
      }
      return pages;
    }
    return [];
  }
  public get itcPages(): number[] {
    let pages = [];
    if (this.itcDataList && this.itcDataList.length > 0) {
      for (let index = 0; index < this.itcDataList.length / 10; index++) {
        pages.push(index + 1);
      }
      return pages;
    }
    return [];
  }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const paddedDay = (day < 10) ? `0${day}` : `${day}`;
    const paddedMonth = (month < 10) ? `0${month}` : `${month}`;
    const formattedDate = `${paddedDay}-${paddedMonth}-${year}` + ` 00:00:00`;
    return formattedDate;
  }
  exportTransaction() {
    if ((this.selectedType == 'ITC' && this.listOfReconMatchingVoITC.length == 0) || (this.selectedType == 'GSTR' && this.listOfReconMatchingVoGSTR.length == 0)) {
      this.toast.error(`Please select atleast one record.`)
    }
    let reqData: any = {
      "filterVo": {
        "startDate": "",
        "endDate": ""
      },
      "ids": this.selectedType == 'ITC' ? this.listOfReconMatchingVoITC.map(res => res.id) : this.listOfReconMatchingVoGSTR.map(res => res.id)
    }
    if (this.filterForm.controls['startDate'].value) {
      reqData.filterVo.startDate = this.formatDate(this.filterForm.controls['startDate'].value);
    }
    if (this.filterForm.controls['endDate'].value) {
      reqData.filterVo.endDate = this.formatDate(this.filterForm.controls['endDate'].value);
    }

    if (this.selectedType == 'ITC') {
      this._service.itcExportTransaction(reqData)
        .subscribe(res => {
        })
    } else {
      this._service.gstrExportTransaction(reqData)
        .subscribe(res => {
        })
    }

  }

  public get today(): Date {
    return new Date();
  }
  transistionUnMatch() {
    this._service.transistionUnMatch(this.selectedType)
      .subscribe(res => {
        console.log(res);
      })
  }
  selectAllITC() {
    if (this.listOfReconMatchingVoITC.length == this.itcDataList.length) {
      this.listOfReconMatchingVoITC = []
    } else {
      this.itcDataList.forEach(element => {
        element.invoiceDateNew = this.convertDateFormat(element.invoiceDate);
      });
      this.listOfReconMatchingVoITC = [...this.itcDataList]
    }
  }
  selectRowITC(row: any) {
    if (this.isSelected(row)) {
      this.listOfReconMatchingVoITC = this.listOfReconMatchingVoITC.filter((data) => data !== row);
    } else {
      row.invoiceDateNew = this.convertDateFormat(row.invoiceDate);
      this.listOfReconMatchingVoITC.push(row);
    }
  }
  isSelected(row: any) {
    return this.listOfReconMatchingVoITC.includes(row);
  }
  get isAllSelectedITC() {
    return this.listOfReconMatchingVoITC.length == this.itcDataList.length && this.listOfReconMatchingVoITC.length > 0;
  }
  selectAllGSTR() {
    if (this.listOfReconMatchingVoGSTR.length == this.allGSTRList.length) {
      this.listOfReconMatchingVoGSTR = []
    } else {
      this.allGSTRList.forEach((row: any) => {
        row.invoiceDateNew = this.convertDateFormat(row.invoiceDate);
      row.fillingDateNew = this.convertDateFormat(row.fillingDate);  
      row.irnDateNew = this.convertDateFormat(row.irnDate);
      row.periodNew = this.convertDateFormat(row.period);
      });
      this.listOfReconMatchingVoGSTR = [...this.allGSTRList]
    }
  }
  selectRowGSTR(row: any) {
    if (this.isSelected(row)) {
      this.listOfReconMatchingVoGSTR = this.listOfReconMatchingVoGSTR.filter((data) => data !== row);
    } else {
      row.invoiceDateNew = this.convertDateFormat(row.invoiceDate);
      row.fillingDateNew = this.convertDateFormat(row.fillingDate);  
      row.irnDateNew = this.convertDateFormat(row.irnDate);
      row.periodNew = this.convertDateFormat(row.period);
      this.listOfReconMatchingVoGSTR.push(row);
    }
  }
  convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    } else {
      return inputDate; // Return the input date if it's not in the expected format
    }
  }
  convertDateFormatDDMMYYY(inputDate: string): string {
    const parts = inputDate.split('-');
    if (parts.length === 3) {
      const [year,month,day] = parts;
      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    } else {
      return inputDate; // Return the input date if it's not in the expected format
    }
  }
  isSelectedGSTR(row: any) {
    return this.listOfReconMatchingVoGSTR.includes(row);
  }
  get isAllSelectedGSTR() {
    if (this.listOfReconMatchingVoGSTR && this.allGSTRList) {
      return this.listOfReconMatchingVoGSTR.length == this.allGSTRList.length;
    }
    return false;
  }
  listOfReconMatchingVoGSTR1: any[] = []
  listOfReconMatchingVoITC1: any[] = []
  reconMatching() {

    this.listOfReconMatchingVoGSTR1 = this.listOfReconMatchingVoGSTR.map(obj => ({ id: obj.id, gstinOfSupplier: obj.gstinOfSupplier, legalName: obj.legalName, invoiceNumber: obj.invoiceNumber, invoiceValue: obj.invoiceValue, status: obj.status }));
    this.listOfReconMatchingVoITC1 = this.listOfReconMatchingVoITC.map(obj => ({ id: obj.id, gstinOfSupplier: obj.gstinOfSupplier, legalName: obj.legalName, invoiceNumber: obj.invoiceNumber, invoiceValue: obj.invoiceValue, status: obj.status }));

    for (let i = 0; i < this.listOfReconMatchingVoGSTR1.length; i++) {
      this.listOfReconMatchingVoGSTR1[i].type = 'GSTR'
    }
    for (let i = 0; i < this.listOfReconMatchingVoITC1.length; i++) {
      this.listOfReconMatchingVoITC1[i].type = 'ITC'
    }
    console.log(this.listOfReconMatchingVoGSTR1)
    const reqData = {
      "listOfMatchingRequestVo": [
        {
          "listOfReconMatchingVoGSTR": this.listOfReconMatchingVoGSTR1,
          "listOfReconMatchingVoITC": this.listOfReconMatchingVoITC1
        }
      ]


    }
    console.log(this.listOfReconMatchingVoGSTR)
    console.log(reqData)
    this._service.reconMatching(reqData)
      .subscribe(res => {
        console.log(res);
      })

  }
  updateItcData(data: any){
    this._spinner.show();
    data.forEach((element: any) => {
      element.invoiceDate = this.convertDateFormatDDMMYYY(element.invoiceDateNew);
      delete element.invoiceDateNew;
    });
    if(this.selectedTab == 'IncorrectData'){
      const reqData = {
        "updateInvalidItcTransactionVo": data
      }
      this._service.updateIncorrectItcData(reqData)
      .subscribe(res => {
        this.listOfReconMatchingVoITC = [];
        this._spinner.hide();
        this.filter();
      })
    } else{
      const reqData = {
        "updateItcTransactionVo": data
      }
      this._service.updateItcData(reqData)
      .subscribe(res => {
        this.listOfReconMatchingVoITC = [];
        this._spinner.hide();
        this.filter();
      })
    }
  }
  updateGstr2BData(data: any){
    this._spinner.show();
     data.forEach((element: any) => {
      element.invoiceDate = this.convertDateFormatDDMMYYY(element.invoiceDateNew);
      element.fillingDate = this.convertDateFormat(element.fillingDateNew);  
      element.irnDate = this.convertDateFormat(element.irnDateNew);
      element.period = this.convertDateFormat(element.periodNew);
      delete element.invoiceDateNew;
      delete element.fillingDateNew;
      delete element.irnDateNew;
      delete element.periodNew;
    });
    if(this.selectedTab == 'IncorrectData'){
      const reqData = {
        "updateInvalidGstrTransactionVo": data
      }
      this._service.updateIncorrectGSTRData(reqData)
      .subscribe(res => {
        this.listOfReconMatchingVoGSTR = [];
        this._spinner.hide();
        this.filter();
      })
    } else{

      const reqData = {
        "updateGstrTransactionVo": data
      }
      this._service.updateGSTR2BData(reqData)
      .subscribe(res => {
        this._spinner.hide();
        this.listOfReconMatchingVoGSTR = [];
        this.filter();
      })
    }
 
  }
  discard(data: any){
    this._spinner.show();
    if(this.selectedTab == 'IncorrectData' && this.selectedType == 'ITC'){
      const reqData = {
        "ids": this.listOfReconMatchingVoITC.map(res => res.id)
      }
      this._service.discardInvalidITC(reqData)
      .subscribe(res => {
        this.listOfReconMatchingVoITC = [];
        this._spinner.hide();
        this.filter();
      })
    } else if(this.selectedTab == 'IncorrectData' && this.selectedType == 'GSTR'){
      const reqData = {
        "ids": this.listOfReconMatchingVoGSTR.map(res => res.id)
      }
      this._service.discardInvalidGSTR(reqData)
      .subscribe(res => {
        this.listOfReconMatchingVoGSTR = [];
        this._spinner.hide();
        this.filter();
      })
    } else if(this.selectedType == 'ITC'){
      const reqData = {
        "ids": this.listOfReconMatchingVoITC.map(res => res.id)
      }
      this._service.discardITC(reqData)
      .subscribe(res => {
        this.listOfReconMatchingVoITC = [];
        this._spinner.hide();
        this.filter();
      })
    } else{
      const reqData = {
        "ids": this.listOfReconMatchingVoGSTR.map(res => res.id)
      }
      this._service.discardGSTR(reqData)
      .subscribe(res => {
        this.listOfReconMatchingVoGSTR = [];
        this._spinner.hide();
        this.filter();
      })
    } 
  }
}

