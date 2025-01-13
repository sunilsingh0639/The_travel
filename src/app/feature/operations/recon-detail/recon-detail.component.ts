import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ViewRuleComponent } from '../../profile/settings/view-rule/view-rule.component';
import { OperationService } from './../../../core/services/operations/operation.service';

@Component({
  selector: 'app-recon-detail',
  templateUrl: './recon-detail.component.html',
  styleUrls: ['./recon-detail.component.scss'],
})
export class ReconDetailComponent {
  fileDuplicateCheckForm!: FormGroup;
  duplicateCriteriasForm!: FormGroup;
  fileValidationByreconForm!: FormGroup;
  fileValidationForm!: FormGroup;
  fileDataValidationForm!: FormGroup;
  columnValidationRulesForm!: FormGroup;

  editButton: boolean = false
  detailAvilable: boolean = false;
  isFileDataCheckAvilable: boolean = false;
  isFileValidationAvilable: boolean = false;
  isDuplicateCheckAvilable: boolean = false;
  isRecordMatchingAvilable: boolean = false;
  postBody!: any
  postDataValidation!:any
  postDataDuplicate!:any
  allRecon: any;
  allClients: any;
  selectedRecon: any;
  fileValidations: any;
  fileDuplicateCheck: any;
  fileDataValidations: any;
  duplicateCheckResponseGSTR2B!: any;
  duplicateCheckResponseITC!: any;
  fileDataCheckResponse: any;
  fileValidationResponseITC: any;
  fileDataValidationResponseGSTR2B: any;
  fileDataValidationResponseITC: any;
  fileValidationResponseGSTR2B: any;
  recordMatchingData: any
  selectedRule: number = 0;
  colums: any[] = [];
  gstr2bColumnList: any[] = [];
  itcColumnList: any[] = [];
  selectedTab: string = 'GSTR2B';
  selected: string = 'fileValidation';
  defultSelected: string = 'defult';
  editSelectedTab: string = 'GSTR2B'
  selectedValidationfileType = 'GSTR2B';
  selectedDataValidationfileType = 'GSTR2B';
  electedDuplicateCheckfileType = 'GSTR2B';

  cardsOfFileValidations: any[] = [1];
  fileDuplicateCards: any[] = [1];
  rules: any[] = [1];
  recordMatchForm!: FormGroup;
  allRules: any[] = [];
  recordMatchingId: any;
  
  constructor(
    private fb: FormBuilder, private _service: ProfileService,
    private detailReconService: OperationService,
    private _route: Router, private dialog: MatDialog,
    private _toast: ToastrService,
    private reconService: OperationService
  ) {
    this.getAllRules();
  }

  ngOnInit() {
    this.intilizeForm()
    this.getReconsById();
    this.getAllColums();
  }

  checkFileValidationByReconId() {
    this.detailReconService.getFileValidationByReconId(this.detailReconService.getReconId())
      .subscribe((res: any) => {
        this.isFileValidationAvilable = true;
        this.fileValidationResponseGSTR2B = res?.data.filter((res: any) => res.fileType == 'GSTR2B')
        this.fileValidationResponseITC = res?.data.filter((res: any) => res.fileType == 'ITC')
        this.editButton = false
      })
  }

  addMoreRecord() {
    this.recordMatch.push(this.addRecordMatch())
  }
  addFileDataValidation() {

    this.columnValidationRules.push(this.addColumnValidationRules())
  }
  removeRule(i: number) {
    this.recordMatch.removeAt(i)
  }
  addFileDuplicate() {
    this.duplicateCriterias.push(this.addDuplicateCriterias());
  }
  removeValidation(i: number) {
    this.columnValidationRules.removeAt(i)
  }
  addFileData() { }
  delete(i: number) {

    this.duplicateCriterias.removeAt(i);
  }

  viewRule(i: any) {
    const dialogConfig = new MatDialogConfig();

    this.reconService.getRulesById(i.value.recordMatch).subscribe((res: any) => {
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

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



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
  get recordMatch() {
    return this.recordMatchForm.get('recordMatch') as FormArray;
  }
  addRecordMatch(): FormGroup {
    return this.fb.group({
      recordMatch: ''
    })
  }

  get columnValidationRules() {
    return this.fileDataValidationForm.controls[
      'addColumnValidationRules'
    ] as FormArray;
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

  get duplicateCriterias() {
    return this.fileDuplicateCheckForm.controls[
      'duplicateCriterias'
    ] as FormArray;
  }

  get recordMatchingArray() {
    return this.recordMatchForm.controls['recordMatching'] as FormArray;
  }

  addRecordMatching(): FormGroup {
    return this.fb.group({
      recordMatch: ['']
    })
  }

  addDuplicateCriterias(): FormGroup {
    return this.fb.group({
      column: [''],
    });
  }
  getAllClients() {
    this.detailReconService.getClients().subscribe((res) => {
      this.allClients = res;
    });
  }


  getFileValidations() {

    if (this.selected == 'fileValidation') {
      this.detailReconService
        .getFileValidationByReconId(
          this.fileValidationByreconForm.controls['reconId'].value
        )
        .subscribe((res: any) => {
          console.log(res);
          this.fileValidations = res;
          this.fileValidationForm.patchValue({
            type: this.fileValidations.type,
            discardIfDuplicateRecordsMTN:
              this.fileValidations.discardIfDuplicateRecordsMTN,
            discardIfInvalidDataMTN:
              this.fileValidations.discardIfInvalidDataMTN,
            discardIfExistsDataMTN: this.fileValidations.discardIfExistsDataMTN,
          });
        });
    }

    if (this.selected == 'fileDataValidation') {
      this.detailReconService
        .getFileDataValidationByReconId(
          this.fileValidationByreconForm.controls['reconId'].value
        )
        .subscribe((res: any) => {
          console.log(res);
          this.fileDataValidations = res;
          this.fileDataValidationForm.patchValue({
            columnValidationRules:
              this.fileDataValidations?.columnValidationRules,
          });
        });
    }

    if (this.selected == 'fileDuplicateCheck') {
      this.detailReconService
        .getFileDuplicateCheckByReconId(
          this.fileValidationByreconForm.controls['reconId'].value
        )
        .subscribe((res: any) => {
          console.log(res);
          this.fileDuplicateCheck = res;
          this.fileDuplicateCheckForm.patchValue({
            duplicateCriterias: res?.duplicateCriterias,
          });
        });
    }
  }

  onSave(data: any) {
    ///////////POSTfILEvALIDATION//////////////////////////
    this.postBody = {
      active: true,
      reconId: this.selectedRecon?.id,
      type: this.fileValidationForm.value.type,
      fileType: this.selectedTab == 'GSTR2B' ? "GSTR2B" : 'ITC',
      discardIfExistsDataMTN: this.fileValidationForm.value.discardIfExistsDataMTN,
      discardIfInvalidDataMTN: this.fileValidationForm.value.discardIfInvalidDataMTN,
      discardIfDuplicateRecordsMTN: this.fileValidationForm.value.discardIfDuplicateRecordsMTN,
    }

    if (this.selected == 'fileValidationForm' && this.editButton == false) {
      this.detailReconService
        .addFileValidationByReconId(this.postBody)
        .subscribe((res) => {
          this.checkFileValidationByReconId()
        });

    }
    if (this.selected == 'fileValidation' && this.editButton) {
      if (this.fileValidationResponseGSTR2B.length == 0 && this.selectedTab == 'GSTR2B') {
        this.detailReconService
          .addFileValidationByReconId(this.postBody)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }
      if (this.fileValidationResponseGSTR2B.length > 0 && this.selectedTab == 'GSTR2B') {
        this.postBody.id = this.fileValidationResponseGSTR2B[0]?.id
        this.detailReconService
          .putFileValidationByReconId(this.postBody)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }
      if (this.fileValidationResponseITC.length == 0 && this.selectedTab == 'ITC') {
        this.detailReconService
          .addFileValidationByReconId(this.postBody)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }
      if (this.fileValidationResponseITC.length > 0 && this.selectedTab == 'ITC') {
        this.postBody.id = this.fileValidationResponseITC[0]?.id
        this.detailReconService

          .putFileValidationByReconId(this.postBody)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }

    }
    ///////////POSTfILEvALIDATION//////////////////////////

this.postDataValidation = {
  fileType: this.selectedTab == 'GSTR2B' ? "GSTR2B" : 'ITC',
  columnValidationRules: this.columnValidationRules.value,
  recons: { id: this.selectedRecon?.id, }
}



    if (this.selected == 'fileDataValidationForm' && this.editButton == false) {
      this.detailReconService
        .addFileDataValidationByReconId(this.postDataValidation)
        .subscribe((res) => {
          this.checkFileValidationByReconId()
        });

    }
    if (this.selected == 'fileDataValidation' && this.editButton) {
      if (this.columnValidationRulesDataGstr2b.length == 0 && this.selectedTab == 'GSTR2B') {
        this.detailReconService
          .addFileDataValidationByReconId(this.postDataValidation)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }
      if (this.columnValidationRulesDataGstr2b.length > 0 && this.selectedTab == 'GSTR2B') {
        this.postDataValidation.id = this.columnValidationRulesDataGstr2b[0]?.id
        for(let i = 0;i < this.columnValidationRules.length;i++ ){
          this.postDataValidation.columnValidationRules[i].id = this.columnValidationRulesDataGstr2b[i].id
        }
        this.detailReconService
          .putFileDataValidationByReconId(this.postDataValidation)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }
      if (this.columnValidationRulesDataItc.length == 0 && this.selectedTab == 'ITC') {
        this.detailReconService
          .addFileDataValidationByReconId(this.postDataValidation)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }
      if (this.columnValidationRulesDataItc.length > 0 && this.selectedTab == 'ITC') {
        this.postDataValidation.id = this.columnValidationRulesDataItc[0]?.id
        for(let i = 0;i < this.columnValidationRules.length;i++ ){
          this.postDataValidation.columnValidationRules[i].id = this.columnValidationRulesDataItc[i].id
        }
        this.detailReconService

          .putFileDataValidationByReconId(this.postDataValidation)
          .subscribe((res) => {
            this.checkFileValidationByReconId()
          });
      }

    }

//fileDuplicate data validation


if (this.selected == 'fileDuplicateCheckForm' && this.editButton == false) {
  this.postDataDuplicate={
    active: true,
    fileType: this.selectedTab,
    duplicateCriterias: this.fileDuplicateCheckForm.value.duplicateCriterias,
    reconId: this.selectedRecon?.id,
  }
  console.log(this.postDataDuplicate)
  this.detailReconService
  .addFileDuplicateCheckByReconId(this.postDataDuplicate)
  .subscribe((res) => {
    console.log(res);
  });

}
if (this.selected == 'fileDuplicateCheck' && this.editButton) {
  if ( this.selectedTab == 'GSTR2B') {
    this.detailReconService
      .addFileDataValidationByReconId(this.postDataValidation)
      .subscribe((res) => {
        this.checkFileValidationByReconId()
      });
  }
  // if ( this.selectedTab == 'GSTR2B') {
  //   this.postDataValidation.id = this.columnValidationRulesDataGstr2b[0]?.id
  //   for(let i = 0;i < this.columnValidationRules.length;i++ ){
  //     this.postDataValidation.columnValidationRules[i].id = this.columnValidationRulesDataGstr2b[i].id
  //   }
  //   this.detailReconService
  //     .putFileDataValidationByReconId(this.postDataValidation)
  //     .subscribe((res) => {
  //       this.checkFileValidationByReconId()
  //     });
  // }
  // if (this.columnValidationRulesDataItc.length == 0 && this.selectedTab == 'ITC') {
  //   this.detailReconService
  //     .addFileDataValidationByReconId(this.postDataValidation)
  //     .subscribe((res) => {
  //       this.checkFileValidationByReconId()
  //     });
  // }
  // if (this.columnValidationRulesDataItc.length > 0 && this.selectedTab == 'ITC') {
  //   this.postDataValidation.id = this.columnValidationRulesDataItc[0]?.id
  //   for(let i = 0;i < this.columnValidationRules.length;i++ ){
  //     this.postDataValidation.columnValidationRules[i].id = this.columnValidationRulesDataItc[i].id
  //   }
  //   this.detailReconService

  //     .putFileDataValidationByReconId(this.postDataValidation)
  //     .subscribe((res) => {
  //       this.checkFileValidationByReconId()
  //     });
  // }

}

//fileDuplicate data validation

 

    // if (this.selected == 'fileDuplicateCheck' || this.selected == 'fileDuplicateCheckForm') {
    //   const body = {
    //     active: true,
    //     fileType: this.selectedTab,
    //     duplicateCriterias: [...this.duplicateCriteriasForm.value],
    //     reconId: this.selectedRecon?.id,
    //   };
    //   this.detailReconService
    //     .addFileDuplicateCheckByReconId(body)
    //     .subscribe((res) => {
    //       console.log(res);
    //     });
    // }

    if (this.selected == 'recordMatchingForm' || this.selected == `recordMatching`) {
      this.updateRecordingMatching();
    }
    if (this.selected == 'defultRecordMatching') {
      this.saveRecordingMatching();
    }

    // this._route.navigate(['/app/operations/recon']);
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  //ALL GET DATA API INT..&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  saveRecordingMatching() {
  
    const selectedRule = this.recordMatchForm.value.recordMatch.map((res: { recordMatch: any; }) => res.recordMatch);
    let rulesId: any[] = []
    this.allRules.forEach(element => {
      if(selectedRule.includes(element.id.toString())){
        let temp = {
          id: element.id,
          ruleSequence: element.ruleSequence
        }
        rulesId.push(temp);
      }
    });
    const reqData = {
      "reconId": this.selectedRecon?.id,
      "rulesId": rulesId
    }
    this._service.saveRecordingMatching(reqData)
      .subscribe((res: any) => {
        this._toast.success(`Record matching saved sucessfully.`, 'Sucess')
      })
  }
  updateRecordingMatching() {
    const selectedRule = this.recordMatchForm.value.recordMatch.map((res: { recordMatch: any; }) => res.recordMatch);
    let rulesId: any[] = [];
    selectedRule.forEach((element : any) => {
      let i = this.allRules.findIndex(res => res.id == element);
      if(i > -1){
        let temp = {
          id: this.allRules[i].id,
          ruleSequence: this.allRules[i].ruleSequence
        }
        rulesId.push(temp);
      }
    });
    const reqData = {
      "recordMatchingId": this.recordMatchingId,
      "rulesId": rulesId
    }
    this._service.updateRecordingMatching(reqData)
      .subscribe((res: any) => {
        this._toast.success(`Record matching updated sucessfully.`, 'Sucess')
      })
  }
  recordMatching() {
    this.detailReconService.getRecordMatchings(this.detailReconService.getReconId()).subscribe((res: any) => {
        if (res && res.rules) {
          this.isRecordMatchingAvilable = true;
          this.recordMatchingData = res?.rules;
          this.recordMatchingId = res.id;
        } else {
          this.isRecordMatchingAvilable = false;
        }
      })
  }
  dataDuplicateCheck() {
    this.detailReconService.dataDuplicateCheckByReconId(this.detailReconService.getReconId())
      .subscribe((res: any) => {
          console.log(res)
          this.isDuplicateCheckAvilable = true;
          this.duplicateCheckResponseGSTR2B = res;
          console.log(res)
        
      })
  }
  columnValidationRulesDataItc!: any
  columnValidationRulesDataGstr2b!: any
  fileDataValidationByReconId() {
    this.detailReconService.fileDataValidationByReconId(this.detailReconService.getReconId())
      .subscribe((res: any) => {
        console.log(res)
        this.isFileDataCheckAvilable = true;
        this.fileDataValidationResponseGSTR2B = res?.data.filter((res: any) => res.fileType == 'GSTR2B')
        this.columnValidationRulesDataGstr2b = this.fileDataValidationResponseGSTR2B[0]?.columnValidationRules
        this.fileDataValidationResponseITC = res?.data.filter((res: any) => res.fileType == 'ITC')
        this.columnValidationRulesDataItc = this.fileDataValidationResponseITC[0]?.columnValidationRules

        this.fileDataCheckResponse = res;
        console.log('filedatya');
      })
  }
  // GET ALL DATA API IN THIS CODE &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  getAllColums() {
    this.detailReconService.getAllColums()
      .subscribe((res: any) => {
        this.colums = res;
        res.data.forEach((item: { fileType: string; id: any; columnName: any; }) => {
          if (item.fileType === "GSTR2B") {
              this.gstr2bColumnList.push({
                  id: item.id,
                  column: item.columnName,
                  active: true
              });
          } else if (item.fileType === "ITC") {
              this.itcColumnList.push({
                  id: item.id,
                  column: item.columnName,
                  active: true
              });
          }
      });
      })
  }

  postFileValidation() {


  }

  edit() {

    this.isFileValidationAvilable = false;
    this.editButton = true;
    this.isFileDataCheckAvilable = false;
    this.isDuplicateCheckAvilable = false
    this.isRecordMatchingAvilable = false

    if (this.selected == 'fileValidation') {
      if (this.selectedTab == 'ITC') {
        this.fileValidationForm.patchValue({
          type: this.fileValidationResponseITC[0]?.type,
          discardIfDuplicateRecordsMTN:
            this.fileValidationResponseITC[0]?.discardIfDuplicateRecordsMTN,
          discardIfInvalidDataMTN:
            this.fileValidationResponseITC[0]?.discardIfInvalidDataMTN,
          discardIfExistsDataMTN: this.fileValidationResponseITC[0]?.discardIfExistsDataMTN,
        });
      }
      if (this.selectedTab == 'GSTR2B') {
        this.fileValidationForm.patchValue({
          type: this.fileValidationResponseGSTR2B[0]?.type,
          discardIfDuplicateRecordsMTN:
            this.fileValidationResponseGSTR2B[0]?.discardIfDuplicateRecordsMTN,
          discardIfInvalidDataMTN:
            this.fileValidationResponseGSTR2B[0]?.discardIfInvalidDataMTN,
          discardIfExistsDataMTN: this.fileValidationResponseGSTR2B[0]?.discardIfExistsDataMTN,
        });
      }
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
    if (this.selected == 'fileDataValidation' && this.selectedTab == 'ITC') {
      this.columnValidationRules.controls.length=0
      for (let i = 0; i < this.columnValidationRulesDataItc.length; i++) {
        this.columnValidationRules.push(this.addColumnValidationRules())
      }
      this.fileDataValidationForm.patchValue({
        addColumnValidationRules: this.columnValidationRulesDataItc
      })
    }
    if (this.selected == 'recordMatchingForm' || this.selected == 'recordMatching') {
      let temp: any[] = [];
      this.recordMatchingData.forEach((element: any) => {
        this.addMoreRecord();
        temp.push({
          'recordMatch': element.id
        })
      });
      this.recordMatch.patchValue(temp);
    }
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
  getAllRules() {
    this._service.getAllRules()
      .subscribe((res: any) => {
        this.allRules = res.data;
      })
  }

  getReconsById() {
    this.reconService.getReconById(this.detailReconService.getReconId()).subscribe((res: any) => {
      this.selectedRecon = res;
      this.checkFileValidationByReconId();

    });
  }
  getDefaultFileDataValidation() {
    this._service.getValidationCheck().subscribe((res: any) => {
      this.editButton = false
      const gstrData = res?.data.filter((ress: any) => ress.fileType == 'GSTR2B');
      this.columnValidationRulesDataGstr2b = gstrData[0].columnValidationRules;
      const itcData = res?.data.filter((ress: any) => ress.fileType == 'ITC');
      this.columnValidationRulesDataItc = itcData[0].columnValidationRules;
     })
  }
  getDefaultFileValidation() {
    this._service.getValidationCreate().subscribe((res: any) => {
      this.editButton = false
      this.fileValidationResponseGSTR2B = res?.data.filter((ress: any) => ress.fileType == 'GSTR2B');
      this.fileValidationResponseITC  = res?.data.filter((ress: any) => ress.fileType == 'ITC');
     })
  }
  duplicateCheckColumnsGSTR2B: any;
  duplicateCheckColumnsITC: any;
  getDefaultFileDuplicate() {
    this._service.getDuplicateCheck().subscribe((res: any) => {
      if(res && res.data){
        this.duplicateCheckColumnsGSTR2B = res.data.find((res : any) => res.fileType == 'GSTR2B');
        this.duplicateCheckColumnsITC = res.data.find((res : any) => res.fileType == 'ITC');
      }
     })
  }

 
}
