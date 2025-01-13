import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationService } from 'src/app/core/services/operations/operation.service';

@Component({
  selector: 'app-rule-configrations',
  templateUrl: './rule-configrations.component.html',
  styleUrls: ['./rule-configrations.component.scss']
})
export class RuleConfigrationsComponent implements OnInit {
  rule: any;
  ruleForm!: FormGroup;
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
      id: 1, name: "Knock Off"
    },
    {
      id: 2,
      name: "Reversal"
    },
    {
      id: 3,
      name: "Making"
    }
  ]
  columns: any[] = [];
  operators: any[] = [];
  itcColums: any[] = [];
  gstr2bColumns: any[] = [];

  initializeReconForm() {
    if (this._route.url.includes('edit-rule')) {
      this.editMode = true;
      this.selectedId = this._router.snapshot.paramMap.get('id');
    }
    if (this.editMode) {
      this.getRule();
    }
    this.ruleForm = this._fb.group({
      ruleType: [''],
      fileType: [''],
      name: [''],
      matchingType: [''],
      description: [''],
      listOfRuleFilter: this._fb.array([]),
      listOfITCFilter: this._fb.array([]),
      listOfGSTR2BFilter: this._fb.array([]),
      listOfMatchingConditionsFilter: this._fb.array([]),
      listOfSameSideRevesalFilter: this._fb.array([]),
      groupByField: [''],
      itcGroupByField: [''],
      gstr2bGroupByField: ['']
    })
    this.addNewRuleFilter();
    this.addNewITCFilter();
    this.addNewGSTR2BFilter();
    this.addMatchingConditionsFilter();
    this.addSameSideReversal();

  }

  public get fileType(): string {
    return this.ruleForm.value.fileType;
  }

  addNewRuleFilter() {
    const item = this._fb.group({
      fieldName: ['', Validators.required],
      operatorType: ['', Validators.required],
      value: ['', Validators.required]
    });
    this.listOfRuleFilter.push(item);
  }
  removeRuleFilter(index: number) {
    this.listOfRuleFilter.removeAt(index);
  }

  get listOfRuleFilter(): FormArray {
    return this.ruleForm.get('listOfRuleFilter') as FormArray;
  }
  get listOfGSTR2BFilter(): FormArray {
    return this.ruleForm.get('listOfGSTR2BFilter') as FormArray;
  }
  get listOfMatchingConditionsFilter(): FormArray {
    return this.ruleForm.get('listOfMatchingConditionsFilter') as FormArray;
  }
  get listOfSameSideRevesalFilter(): FormArray {
    return this.ruleForm.get('listOfSameSideRevesalFilter') as FormArray;
  }
  get listOfITCFilter(): FormArray {
    return this.ruleForm.get('listOfITCFilter') as FormArray;
  }
  getRule() {
    this.ruleservice.getRulesById(this.selectedId).subscribe((res: any) => {
      this.ruleForm.patchValue(res);
    });
  }
  addNewRule() {
    let reqData = this.removeBlankValues(this.ruleForm.value);
    if (reqData.ruleType == 'MATCHING') {
      reqData.listOfGSTR2BFilter.forEach((element : any) => {
        element.fileType = 'GSTR2B';
      });
      reqData.listOfITCFilter.forEach((element : any) => {
        element.fileType = 'ITC';
      });
      reqData.filters = [...reqData.listOfGSTR2BFilter, ...reqData.listOfITCFilter];
      reqData.matchingConditions = [...reqData.listOfMatchingConditionsFilter];
      reqData.matchingConditions.forEach((element : any) => {
        element.leftField = element.fieldNameITC;
        element.rightField = element.fieldNameGSTR2B;
        element.leftFileType = 'ITC';
        element.rightFileType = 'GSTR2B'
      });
    } else if (reqData.ruleType == 'SAME_SIDE_REVERSAL') {
      reqData.filters = [...reqData.listOfRuleFilter];
      reqData.filters.forEach((element: any) => {
        element.fileType = this.fileType;
        element.value = parseFloat(element.value);
      });
      reqData.matchingConditions = [...reqData.listOfSameSideRevesalFilter];
      reqData.matchingConditions.forEach((element: any) => {
        element.leftFileType = this.fileType;
        element.rightFileType = this.fileType;
      });
    } else {
      reqData.filters = [...reqData.listOfRuleFilter]
    }
    if (this.matchingType == 'ONE_TO_MANY') {
      reqData.groupingConditions = [{
        fieldName: this.ruleForm.value.groupByField
      }]
    }
    if (this.matchingType == 'MANY_TO_MANY') {
      reqData.groupingConditions = [{
        fieldName: this.ruleForm.value.itcGroupByField,
        fileType: 'ITC'
      },
      {
        fieldName: this.ruleForm.value.gstr2bGroupByField,
        fileType: 'GSTR2B'
      }]
    }
    const data = { ...reqData }

    delete data.groupByField;
    delete data.listOfGSTR2BFilter;
    delete data.listOfITCFilter;
    delete data.listOfRuleFilter;
    delete data.listOfMatchingConditionsFilter
    delete data.listOfSameSideRevesalFilter
    delete data.itcGroupByField
    delete data.gstr2bGroupByField
    if (this.matchingType == 'MANY_TO_MANY') {
      delete data.matchingConditions
    }
    this.ruleservice.addRule(data).subscribe((res: any) => {
      this._toast.success('Rule created successfully.', 'Success!')
      this.ruleForm.reset();
    })
  };
  navigate() {
    window.history.back();
  };

  ngOnInit() {
    this.initializeReconForm()
    this.getAllColums();
    this.getAllOperators();
  }
  constructor(private _route: Router,
    private _router: ActivatedRoute,
    private _fb: FormBuilder,
    private ruleservice: OperationService,
    private _toast: ToastrService) {
  }

  addNewITCFilter() {
    const item = this._fb.group({
      fieldName: ['', Validators.required],
      operatorType: ['', Validators.required],
      value: ['', Validators.required],
      fileType: ['ITC']
    });
    this.listOfITCFilter.push(item);
  }
  addNewGSTR2BFilter() {
    const item = this._fb.group({
      fieldName: ['', Validators.required],
      operatorType: ['', Validators.required],
      value: ['', Validators.required],
      fileType: ['GSTR2B']
    });
    this.listOfGSTR2BFilter.push(item);
  }
  addMatchingConditionsFilter() {
    const item = this._fb.group({
      fieldNameITC: ['', Validators.required],
      operatorType: ['', Validators.required],
      fieldNameGSTR2B: ['', Validators.required]
    });
    this.listOfMatchingConditionsFilter.push(item);
  }
  addSameSideReversal() {
    const item = this._fb.group({
      leftField: ['', Validators.required],
      leftFileType: ['ITC'],
      operatorType: ['', Validators.required],
      rightField: ['', Validators.required],
      rightFileType: ['ITC']
    });
    this.listOfSameSideRevesalFilter.push(item);
  }
  addNewRightFilter() {
    this.rightFilters.push(1);
  }

  public get type(): string {
    return this.ruleForm.value.ruleType;
  }
  public get matchingType(): string {
    return this.ruleForm.value.matchingType;
  }


  removeRightFilters(i: number) {
    this.rightFilters.splice(i, 1)
  }
  removeITCFilter(i: number) {
    this.listOfITCFilter.removeAt(i);
  }
  removeGSTR2BFilter(i: number) {
    this.listOfGSTR2BFilter.removeAt(i);
  }
  removeMatchingCodition(i: number) {
    this.listOfMatchingConditionsFilter.removeAt(i);
  }
  removeSameSideReversal(i: number) {
    this.listOfSameSideRevesalFilter.removeAt(i);
  }
  removeFilterValue(i: number) {
    this.filters.splice(i, 1)
  }
  removeBlankValues(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var value = obj[key];
        if (Array.isArray(value)) {
          if (value.length === 0) {
            delete obj[key];
          }
        } else if (value === '' || value === null || value === undefined) {
          delete obj[key];
        }
      }
    }
    return obj;
  }
  getAllColums() {
    this.ruleservice.getAllColums()
      .subscribe((res: any) => {
        this.columns = res?.data;
        this.itcColums = res.data.filter((res: any) => res.fileType == 'ITC');
        this.gstr2bColumns = res.data.filter((res: any) => res.fileType == 'GSTR2B')
      })
  }
  getAllOperators() {
    this.ruleservice.getAllOperators()
      .subscribe((res: any) => {
        this.operators = res?.data;
      })
  }
}
