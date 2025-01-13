import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  @Input()
  listOfReconMatchingVoITC: any;
  @Input()
  listOfReconMatchingVoGSTR2B: any;
  @Output() updateItcData = new EventEmitter<any>();
  @Output() updateGstr2BData = new EventEmitter<any>();
  @Output() discard = new EventEmitter<any>();
  updateItc(){
    this.updateItcData.emit(this.listOfReconMatchingVoITC)
  }
  updateGSTR(){
    this.updateGstr2BData.emit(this.listOfReconMatchingVoGSTR2B)
  }
  invoiceTypeList: any[] = [
    {
      value: `INTERIM_INVOICE`,
      label: `INTERIM INVOICE`
    },
    {
      value: 'FINAL_INVOICE',
      label: 'FINAL INVOICE'
    },
    {
      value: 'COLLECTIVE_INVOICE',
      label: 'COLLECTIVE INVOICE'
    },
    {
      value: 'CREDIT_INVOICE',
      label: 'CREDIT INVOICE'
    },{
      value: 'DEBIT_INVOICE',
      label: 'DEBIT INVOICE'
    }
  ]
  transactionStatusList: any[] = [
    "RECONCILED","UNRECONCILED","KNOCK_OFF","DUPLICATE","SAME_SIDE_REVERSAL","PROPOSE_MATCH","RELAX_MATCH",
    "ACTION_IN_PROGRESS","LATE_REVERSAL","UPLOADED",
    "EDIT_INVALID_DATA","DISCARDED","RECONCILED_MANUALLY","FORCE_MATCH","FORCE_UNMATCH","DUPLICATE_MATCH_KNOCK_OFF","INVALID"
  ]
  booleanStatusList: any[] = [
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]
  discardTrasistion(){
    this.discard.emit('disacrd');
  }
}
