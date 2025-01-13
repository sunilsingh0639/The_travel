import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OperationService } from 'src/app/core/services/operations/operation.service';
import { ViewRuleComponent } from 'src/app/feature/profile/settings/view-rule/view-rule.component';

@Component({
  selector: 'app-recon-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsReconComponent {

  @Input()
  selected: any;
  editButton: boolean = false;
  defultSelected: string = '';
  isFileValidationAvilable: boolean = false;
  selectedTab: string = '';
  @Input()
  fileValidationResponseGSTR2B: any;
  @Output()
  editAction = new EventEmitter<any>();
  @Output()
  checkFileValidationByReconIdAction = new EventEmitter<any>();
  @Output()
  fileDataValidationByReconIdAction = new EventEmitter<any>();
  @Output()
  dataDuplicateCheckAction = new EventEmitter<any>();
  @Output()
  recordMatchingAction = new EventEmitter<any>();
  @Input()
  fileValidationResponseITC: any;
  @Input()
  isFileDataCheckAvilable: boolean = false;
  @Input()
  isDuplicateCheckAvilable: boolean = false;
  fileValidationForm!: FormGroup;
  fileValidationByreconForm!: FormGroup;
  fileDataValidationForm!: FormGroup;
  fileDuplicateCheckForm!: FormGroup;
  recordMatchForm!: FormGroup;
  allRecon: any;
  columnValidationRulesDataGstr2b!: any;
  columnValidationRulesDataItc!: any;
  @Input()
  columns: any;
  @Input()
  allRules: any[] = [];
  @Input()
  isRecordMatchingAvilable: any;
  @Input()
  recordMatchingData : any;
  @Input()
  recordMatchingId: any;
  constructor(private fb: FormBuilder, private detailReconService: OperationService, private dialog: MatDialog){

  }
  

  edit(){
    this.editAction.emit();
  }
  checkFileValidationByReconId(){
    this.checkFileValidationByReconIdAction.emit();
  }
  fileDataValidationByReconId(){
    this.fileDataValidationByReconIdAction.emit();
  }
  dataDuplicateCheck(){
    this.dataDuplicateCheckAction.emit();
  }
  recordMatching(){
    this.recordMatchingAction.emit();
  }
  
  intilizeForm() {
    this.fileValidationByreconForm = this.fb.group({
      clientId: ['', Validators.required],
      reconId: ['', Validators.required],
    });
    this.fileValidationByreconForm.controls['clientId'].valueChanges.subscribe(
      (res) => {
        if (this.selected == 'fileValidation') {
          this.detailReconService
            .getReconsWithFileValidations(res)
            .subscribe((res) => {
              this.allRecon = res;
              console.log(res);
            });
        }
        if (this.selected == 'fileDataValidation') {
          this.detailReconService
            .getReconsWithFileDataValidations(res)
            .subscribe((res) => {
              this.allRecon = res;
              console.log(res);
            });
        }
        if (this.selected == 'fileDuplicateCheck') {
          this.detailReconService
            .getReconsWithFileDuplicateCheck(res)
            .subscribe((res) => {
              this.allRecon = res;
              console.log(res);
            });
        }
      }
    );
    ///////// file validation form
    this.fileValidationForm = this.fb.group({
      type: '',
      discardIfExistsDataMTN: '',
      discardIfInvalidDataMTN: '',
      discardIfDuplicateRecordsMTN: '',
    });
    ///////// file data validation form
    this.fileDataValidationForm = this.fb.group({
      addColumnValidationRules: this.fb.array([
        this.addColumnValidationRules(),
        this.addColumnValidationRules(),
      ]),
    });
    //////////// file duplicate check form
    this.fileDuplicateCheckForm = this.fb.group({
      duplicateCriterias: this.fb.array([this.addDuplicateCriterias()]),

    });

    this.recordMatchForm = this.fb.group({
      recordMatch: this.fb.array([]),
    });
  }
  addColumnValidationRules(): FormGroup {
    return this.fb.group({
      active: ['true'],
      columnName: [''],
      type: ['', [Validators.required]],
      format: ['', [Validators.required]],
      mandatory: ['', [Validators.required]]
    })
  }
  addDuplicateCriterias(): FormGroup {
    return this.fb.group({
      column: [''],
    });
  }
  gstr2bValuePatch() {
    if (this.selected == 'fileValidation' && this.selectedTab == 'GSTR2B') {
      this.fileValidationForm.reset()
      this.fileValidationForm.patchValue({
        type: this.fileValidationResponseGSTR2B[0].type,
        discardIfExistsDataMTN: this.fileValidationResponseGSTR2B[0].discardIfExistsDataMTN,
        discardIfInvalidDataMTN: this.fileValidationResponseGSTR2B[0].discardIfInvalidDataMTN,
        discardIfDuplicateRecordsMTN: this.fileValidationResponseGSTR2B[0].discardIfDuplicateRecordsMTN
      })
    }
    if (this.selected == 'fileDataValidation' && this.selectedTab == 'GSTR2B') {
      this.columnValidationRules.controls.length=0
      for (let i = 0; i < this.columnValidationRulesDataGstr2b.length; i++) {
        this.columnValidationRules.push(this.addColumnValidationRules())
      }
      this.fileDataValidationForm.patchValue({
        addColumnValidationRules: this.columnValidationRulesDataGstr2b
      })

    }
  }
  get columnValidationRules() {
    return this.fileDataValidationForm.controls[
      'addColumnValidationRules'
    ] as FormArray;
  }
  itcValuePatch() {
    if (this.selected == 'fileValidation' && this.selectedTab == 'ITC') {
      this.fileValidationForm.reset()
      this.fileValidationForm.patchValue({
        type: this.fileValidationResponseITC[0].type,
        discardIfDuplicateRecordsMTN:
          this.fileValidationResponseITC[0].discardIfDuplicateRecordsMTN,
        discardIfInvalidDataMTN:
          this.fileValidationResponseITC[0].discardIfInvalidDataMTN,
        discardIfExistsDataMTN: this.fileValidationResponseITC[0]?.discardIfExistsDataMTN,
      });
    }
    if (this.selected == 'fileDataValidation' && this.selectedTab == 'ITC') {
      this.columnValidationRules.controls.length=0
      for (let i = 0; i < this.columnValidationRulesDataItc.length ; i++) {
        this.columnValidationRules.push(this.addColumnValidationRules())
      }
      this.fileDataValidationForm.patchValue({
        addColumnValidationRules: this.columnValidationRulesDataItc
      })
    }
  }
  removeValidation(i: number) {
    this.columnValidationRules.removeAt(i)
  }
  get duplicateCriterias() {
    return this.fileDuplicateCheckForm.controls[
      'duplicateCriterias'
    ] as FormArray;
  }
  delete(i: number) {
    this.duplicateCriterias.removeAt(i);
  }
  get recordMatch() {
    return this.recordMatchForm.get('recordMatch') as FormArray;
  }
  addRecordMatch(): FormGroup {
    return this.fb.group({
      recordMatch: ''
    })
  }
  removeRule(i: number) {
    this.recordMatch.removeAt(i)
  }
  viewRule(i: any) {
    const dialogConfig = new MatDialogConfig();
    this.detailReconService.getRulesById(i.value.recordMatch).subscribe((res: any) => {
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = res;
      dialogConfig.hasBackdrop = true;
      dialogConfig.height = '85%';
      dialogConfig.width = '100%';
      const dialogRef = this.dialog.open(ViewRuleComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });

  }
  addMoreRecord() {
    this.recordMatch.push(this.addRecordMatch())
  }
  addFileDuplicate() {
    this.duplicateCriterias.push(this.addDuplicateCriterias());
  }
  addFileDataValidation() {
    this.columnValidationRules.push(this.addColumnValidationRules())
  }
  onSave(data: any) {
   }
  
}
