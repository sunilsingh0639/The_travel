import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/core/services/clients/client.service';
import { CommonService } from 'src/app/core/services/commom/common.service';
import { OperationService } from 'src/app/core/services/operations/operation.service';
import { ManualMatchListHeaders } from 'src/app/modal/table-headers';
import { TransistionData } from 'src/app/modal/transistions';
import { ListViewComponent } from 'src/app/shared/shared/list-view/list-view.component';

@Component({
  selector: 'app-manual-match',
  templateUrl: './manual-match.component.html',
  styleUrls: ['./manual-match.component.scss']
})
export class ManualMatchComponent implements OnInit {
  hideClient!: boolean
  step: number = 1;
  headers: any[] = ManualMatchListHeaders;
  data: any[] = TransistionData;
  rules: any[] = [];
  clientList!: any;
  reconList!: any;
  manualMatchForm!: FormGroup;
  selectedRule: number = 0;
  userForm!: FormGroup;
  selectedReconId: string = '';
  selectedClientId: string = '';
  selectedRuleDetail: any;
  selectedRules: any[] = [];
  selectedType: string = 'itc';
  itcResponseData: any[] = [];
  gstrResponseData: any[] = [];
  columns: any[] = [];
  itcColums: any[] = [];
  gstr2bColumns: any[] = [];
  operators: any[] = [];
  generatedId: any;
   @ViewChild(ListViewComponent) table!: ListViewComponent;

  constructor(private _service: ClientService, private _common: CommonService, 
    private _fb: FormBuilder,private _toast: ToastrService, private ruleservice:OperationService) { }

  ngOnInit(): void {
    if (this._common.subsType == 'INDIVIDUAL_COMPANY') {
      this.hideClient = true;
      this.selectedClientId = this._common.client.id;
      this.getReconsListByClientId();
    } else {
      this.hideClient = false;
      this.getClientList();
     
    }
    this.initlizeForm();
    this.getAllColums();
  }
  /**
   * initlizeForm
   */
  initlizeForm() {
    this.manualMatchForm = this._fb.group({
      client: ['', Validators.required],
      recon: ['', Validators.required]
    })
    this.userForm = this._fb.group({
      type: ['', Validators.required],
      selectionType: [''],
      name: [''],
      matchingType: ['', Validators.required],
      filter:this._fb.array([this.addFilter()]),
      listOfITCRulesFilter: this._fb.array([]),
      listOfGSTR2BRulesFilter: this._fb.array([]),
      listOfMatchingCondition: this._fb.array([])
    })
  }
  get filter(){
    return this.userForm.controls['filter'] as FormArray

  }
  get itcFilter(){
    return this.userForm.controls['itcFilter'] as FormArray

  }
  get listOfITCRulesFilter(): FormArray {
    return this.userForm.get('listOfITCRulesFilter') as FormArray;
  }
  get listOfGSTR2BRulesFilter(): FormArray {
    return this.userForm.get('listOfGSTR2BRulesFilter') as FormArray;
  }
  get listOfMatchingCondition(): FormArray {
    return this.userForm.get('listOfMatchingCondition') as FormArray;
  }
  addItcFilter() :FormGroup {
    return this._fb.group({
      fieldName:[''] ,
      operatorType:[''],
      value:['']
  
    })
  }
  addMatchingFilter() :FormGroup {
    return this._fb.group({
      fieldNameITC:[''] ,
      fieldNameGSTR2B:[''],
      operatorType:['']
    })
  }
addFilter() :FormGroup {
  return this._fb.group({
    filed:[''] ,
    operator:[''],
    value:['']

  })
}

  getClientList() {
    this._service.getClient()
      .subscribe((res: any) => {
        this.clientList = res;
        console.log(this.clientList);
        
      })
  }

  getReconsListByClientId() {
    this.selectedRules = [];

    this._service.getReonsByClientId(this.selectedClientId)
      .subscribe((res: any) => {
        this.reconList = res.data;
        
      })
  }
  
  getRuleListByReconId() {
    this.selectedRules = [];
    this._service.getRuleListByReconId(this.manualMatchForm.value.recon)
      .subscribe((res: any) => {
        this.rules = res.rules;
        console.log(res)
      })
  }
  getManualMatchGSTR2BData(){
    this._service.getManualMatchGSTR2BData(this.generatedId)
    .subscribe((res: any) => {
      res.listOfManualMatchExecutionResult.forEach((element: any) => {
        if(element.transactionData && element.transactionData.length > 0){
          element.transaction = {...element.transactionData[0]};
          element = this.removeNestedObject(element);
          element.id = element.executionId;
        }
      });
      this.data =[...res.listOfManualMatchExecutionResult];
  })
  }
  saveManualMatchData(){
    const rules = [...this.selectedRules];
    rules.forEach(element => {
      element.recon = {
        id: this.manualMatchForm.value.recon
      }
      element.listOfRulesFilter = [...element.filters];
      delete element.filters
    });
    const reqData = {
      "recon": { id: this.manualMatchForm.value.recon},
      "ruleVoList": rules
  }
    this._service.saveManualMatch(reqData)
    .subscribe((res : any) => {
      this.generatedId = res.id;
      this.getManualMatchITCData();
    })
  }
  getManualMatchITCData(){
    this._service.getManualMatchITCData(this.generatedId)
    .subscribe((res: any) => {
      this.itcResponseData = [...res.listOfManualMatchExecutionResult];
      res.listOfManualMatchExecutionResult.forEach((element: any) => {
        if(element.transactionData && element.transactionData.length > 0){
          element.transaction = {...element.transactionData[0]};
          element = this.removeNestedObject(element);
          element.id = element.executionId;
        }
      });
      this.data = [...res.listOfManualMatchExecutionResult];
    })
  }
  removeNestedObject(obj: any) {
    for (var key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        var nestedObj = obj[key];
        delete obj[key];
        for (var nestedKey in nestedObj) {
          obj[nestedKey] = nestedObj[nestedKey];
        }
      }
    }
    return obj;
  }
  acceptManualMatchData(){
    if(this.table && this.table.selected && this.table.selected.length > 0){
      let reqData: any[] = [];
      const response = this.selectedType == 'itc' ? this.itcResponseData : this.gstrResponseData;
      this.table.selected.forEach(element => {
        response.forEach(subElement => {
          if(subElement.executionId == element){
            let temp = {
              transactionId: subElement.transactionId,
              executionId: subElement.executionId,
              type: this.selectedType == 'itc' ? 'ITC' : 'GSTR'
            }
            reqData.push(temp);
          
        }
        });
      });
      this._service.acceptManualMatchData(reqData)
      .subscribe((res: any) => {
        this._toast.success('Your manumal match records accepted.', 'Successfull')
      })  
    } else{
      this._toast.error('Please Select atleast on record.', 'Error')
    }
  }
  rejectManualMatchData(){
    if(this.table && this.table.selected && this.table.selected.length > 0){
      let temp: any[] = [];
      const response = this.selectedType == 'itc' ? this.itcResponseData : this.gstrResponseData;
      this.table.selected.forEach(element => {
        response.forEach(subElement => {
          if(subElement.executionId == element){
            temp.push(subElement);
          }
        });
      });
      let reqData = {
        executionIds : temp.map(res => res.transactionId),
        transactionType: this.selectedType == 'itc' ? 'ITC' : 'GSTR'
      };
      this._service.rejectManualMatchData(reqData)
      .subscribe((res: any) => {
        this._toast.success('Your manumal match records rejetced.', 'Successfull')
      })  
    } else{
      this._toast.error('Please Select atleast on record.', 'Error')
    }
  }
  // for dummy ui

  editMode: boolean = false;
  selectedId: any;
  userById: any;
  roleName: any;
  rolesList: any;
  filters: any[] = [1];
  leftFilters: any[] = [1];
  rightFilters: any[] = [1];
  matchingConditions: any[] = [1];
  allTypes: any[] = [
    {
      name: "Knock Off"
    },
    {
      name: "Reversal"
    },
    {
      name: "Making"
    }
  ]
  addNewUser() { };
  navigate() { };
  addNewFilter() {
    this.selectedRules[this.selectedRule].filters.push({
      fieldName: '',
      operatorType: '',
      value: ''
    })
  }
  addNewLeftFilter() {
    this.listOfITCRulesFilter.push(this.addItcFilter());
  }

  addNewRightFilter() {
    this.listOfGSTR2BRulesFilter.push(this.addItcFilter());
  }

  public get type(): string {
    return this.userForm.value.type;
  }
  public get matchingType(): string {
    return this.userForm.value.matchingType;
  }
  addNewMatchingCodition() {
    this.listOfMatchingCondition.push(this.addMatchingFilter())
  }
  removeMatchingCodition(i: number) {
    this.listOfITCRulesFilter.removeAt(i)
  }
  removeRightFilters(i: number) {
    this.listOfGSTR2BRulesFilter.removeAt(i)
  }
  removeLeftFilters(i: number) {
    this.itcFilter.removeAt(i)
  }
  removeFilterValue(i: number) {
    this.filters.splice(i, 1)
  }
  updateClient(){
    this.selectedClientId = this.manualMatchForm.value.client;
    this.getReconsListByClientId();
  }
  goToMatchingRules(){
    this.selectedRuleDetail = this.selectedRules[0];
    const listOfITCRulesFilter = this.selectedRuleDetail.filters.filter((res : any) => res.fileType == 'ITC');
    const listOfGSTR2BRulesFilter = this.selectedRuleDetail.filters.filter((res : any) => res.fileType == 'GSTR2B');
    for (let index = 0; index < listOfITCRulesFilter.length; index++) {
      this.listOfITCRulesFilter.push(this.addItcFilter());
    }
    this.userForm.controls['listOfITCRulesFilter'].patchValue(listOfITCRulesFilter);
    for (let index = 0; index < listOfGSTR2BRulesFilter.length; index++) {
      this.listOfGSTR2BRulesFilter.push(this.addItcFilter());
    }
    this.userForm.controls['listOfGSTR2BRulesFilter'].patchValue(listOfGSTR2BRulesFilter);
    if(this.selectedRuleDetail.matchingConditions){
      for (let index = 0; index < this.selectedRuleDetail.matchingConditions.length; index++) {
        this.listOfMatchingCondition.push(this.addMatchingFilter());
      }
      this.userForm.controls['listOfMatchingCondition'].patchValue(this.selectedRuleDetail.matchingConditions);  
    }
    if(this.selectedRuleDetail.matchingType){
      this.userForm.patchValue({
        type: this.selectedRuleDetail.matchingType
      })
    }
   
  }
  updateSelectedRule(data: any){
    const i = this.selectedRules.findIndex(res => res == data);
    if(i == -1){
      this.selectedRules.push(data);
    } else {
     this.selectedRules.splice(i,1)
    }
  }
  isChecked(data: any){
    const i = this.selectedRules.findIndex(res => res == data);

    return i == -1 ? false : true;
  } 
  getAllColums(){
    this.ruleservice.getAllColums()
    .subscribe((res : any) => {
      this.columns = res?.data;
      this.itcColums = res.data.filter((res: any) => res.fileType == 'ITC');
      this.gstr2bColumns = res.data.filter((res: any) => res.fileType == 'GSTR2B');
      this.getAllOperators();
    })
  }
  getAllOperators(){
    this.ruleservice.getAllOperators()
    .subscribe((res : any) => {
      this.operators = res?.data;
    })
  }
}
