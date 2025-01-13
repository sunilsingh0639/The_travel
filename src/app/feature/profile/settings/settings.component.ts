import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OperationService } from 'src/app/core/services/operations/operation.service';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ViewRuleComponent } from './view-rule/view-rule.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  recordMatchingForm!: FormGroup
  selected: string = 'fileValidation';
  cards: any[] = [1];
  cardsRecord: any[] = [1];
  selectedTab: string = 'GSTR2B';
  filters: any[] = [2];
  rules: any[] = [1];
  selectedRule: number = 0;
  fileValidetionDefult: any[] = [];
  ruleList: any;
  postBody: any;
  gstr2bColumnList: any[] = [];
  itcColumnList: any[] = [];
  fileValidetionDefultITC!: any;
  fileValidetionDefultGSTR2B!: any;
  fileDataValidetionDefultITC!: any;
  fileDataValidetionDefultGSTR2B!: any;
  isITC: any[] = []
  isGSTR2B: any[] = []
  isDuplicateITC: any[] = []
  isDuplicateGSTR2B: any[] = []
  isFileValidetionDefult: boolean = false
  isPostItcData: boolean = false
  isFileDataValidetionDefult: boolean = false
  isFileDuplicateValidetionDefult: boolean = false
  editButton: boolean = false
  isRecordMatching: boolean = false;
  allRules: any[] = [];
  recordMatcingId: any;
  //  GET ALL DATA API IN--G...IN THIS SECOTION&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&
  getDefultValidetion() {
    this.service.getValidationCreate().subscribe((res: any) => {
      this.editButton = false
      this.fileValidetionDefultGSTR2B = res?.data.filter((ress: any) => ress.fileType == 'GSTR2B')
      this.fileValidetionDefultITC = res?.data.filter((ress: any) => ress.fileType == 'ITC')
      this.isFileValidetionDefult = true;
      this.selectedTab = 'GSTR2B';
    })
  }
  getDefultDataValidetion() {
    this.service.getValidationCheck().subscribe((res: any) => {

      this.editButton = false
      this.fileDataValidetionDefultGSTR2B = res?.data.filter((ress: any) => ress.fileType == 'GSTR2B')
      this.fileDataValidetionDefultITC = res?.data.filter((ress: any) => ress.fileType == 'ITC')
      this.isGSTR2B = this.fileDataValidetionDefultGSTR2B[0] && this.fileDataValidetionDefultGSTR2B[0]?.columnValidationRules ? this.fileDataValidetionDefultGSTR2B[0]?.columnValidationRules : [];
      this.isITC = this.fileDataValidetionDefultITC[0] && this.fileDataValidetionDefultITC[0]?.columnValidationRules ? this.fileDataValidetionDefultITC[0]?.columnValidationRules : [];
      this.isFileDataValidetionDefult = true;
      this.selectedTab = 'GSTR2B';
    })
  }
  duplicateCheckId: any;
  getDefultDuplicateValidetion() {
    this.service.getDuplicateCheck().subscribe((res: any) => {
      if (res?.data[0]['duplicateCriterias'].length > 0) {
        this.editButton = false
        this.fileValidetionDefultITC = res?.data.filter((ress: any) => ress.fileType == 'ITC')
        this.isDuplicateITC = this.fileValidetionDefultITC[0]?.duplicateCriterias
        this.fileValidetionDefultGSTR2B = res?.data.filter((ress: any) => ress.fileType == 'GSTR2B')
        this.isDuplicateGSTR2B = this.fileValidetionDefultGSTR2B[0]?.duplicateCriterias
        this.isFileDuplicateValidetionDefult = true;
        this.selectedTab = 'GSTR2B';
      }
    })
  }
  isAvialbleRecordMatching: boolean = false;
  getRecordMatching() {
    this.ruleList = [];
    this.service.getRecordMatchingGlobal().subscribe((res: any) => {
      this.ruleList = res && res.rules ? res.rules : [];
      this.recordMatcingId = res.id ? res.id : '';
      if(this.recordMatcingId)
      this.isAvialbleRecordMatching = true;
    })



    // this.service.getDuplicateCheck().subscribe((res: any) => {
    //   this.isRecordMatching = true;
    //   this.editButton = false
    //   this.fileValidetionDefultGSTR2B = res?.data.filter((ress: any) => ress.fileType == 'ITC')
    //   this.fileValidetionDefultITC = res?.data.filter((ress: any) => ress.fileType == 'GSTR2B')
    //   console.log(res)
    //   this.selectedTab = 'GSTR2B';
    // })


  }

  getColumnList(){
    this.opService.getAllColums().subscribe((res: any) => {
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
  // END OF  ALL GET  DATA &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 

  addMore() {
    this.cards.push(this.cards.length)
  }
  addMoreRecord() {
    this.recordMatch.push(this.addRecordMatch())
  }
  addDataValidationCards() {
    this.gstr.push(this.gstrControls())
  }
  removeRule(i: number) {
    this.recordMatch.removeAt(i)
  }
  removeValidation(i: number) {
    this.gstr.removeAt(i);
  }
  viewRule(i: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.allRules[i];
    dialogConfig.hasBackdrop = true;
    dialogConfig.height = '70%';
    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(ViewRuleComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  delete(i: number) {
    this.cards.splice(i, 1);
  }
  deleteRecord(i: number) {
    this.cardsRecord.splice(i, 1);
  }

  cars = [
    { id: 1, active: true, column: 'Kia Tata' },
    { id: 2, active: true, column: 'volo' },
    { id: 3, active: true, column: 'hero' },
    { id: 4, active: true, column: 'Kia hero' },
    { id: 5, active: true, column: 'Kia sswr' },
  ];

  selectedCars = [{ id: 3, name: "Volkswagen Ford" }];
  constructor(private fb: FormBuilder, private service: ProfileService, private opService: OperationService,
    private dialog: MatDialog, private _toast: ToastrService) { }

  // declaring form as a FormGroup
  fileValidationForm!: FormGroup
  fileDataValidationForm!: FormGroup
  // fileDataValidationGSTRForm!: FormGroup
  // fileDataValidationITCForm!: FormGroup
  fileDuplicateForm!: FormGroup

  ngOnInit() {
    this.initalizatiionFileValidation()
    this.initalizationFileDuplicate()
    this.initalizationFileDataValidation()
    this.getDefultValidetion()
    this.initalizationRecordMatch();
    this.getAllRules();
  }

  /* Initalization function of file validation */


  initalizatiionFileValidation() {
    this.fileValidationForm = this.fb.group({
      type: ['', Validators.required],
      exists: ['', [Validators.required]],
      invalid: ['', [Validators.required]],
      duplicate: ['', [Validators.required]]
    })
  }

  ////////////////FILE VALIDATION DATA POST AND PUT

  getttingValidationCreate() {
    this.postBody = {
      active: true,
      type: this.fileValidationForm.value.type,
      fileType: this.selectedTab == 'GSTR2B' ? "GSTR2B" : 'ITC',
      discardIfExistsDataMTN: new Number(this.fileValidationForm.value.exists),
      discardIfInvalidDataMTN: new Number(this.fileValidationForm.value.invalid),
      discardIfDuplicateRecordsMTN: new Number(this.fileValidationForm.value.duplicate),
    }
    if (this.selected == 'fileValidation' && this.editButton == false) {
      this.service.postValidationCreate(this.postBody)
        .subscribe(res => {
          this._toast.success(`Applied File Validation Successful`);
          this.getDefultValidetion()
          this.getDefultValidetion()
          this.fileValidationForm.reset();
        })
    }

    else if (this.selected == 'fileValidation' && this.editButton == true) {
      if (this.selectedTab == 'GSTR2B' && this.fileValidetionDefultGSTR2B.length > 0) {
        this.postBody.id = this.fileValidetionDefultGSTR2B[0].id
        this.service.putValidationCreate(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultValidetion()
            this.getDefultValidetion()
            this.fileValidationForm.reset();
          })
      }
      else if (this.selectedTab == 'ITC' && this.fileValidetionDefultITC.length > 0) {
        this.postBody.id = this.fileValidetionDefultITC[0].id
        this.service.putValidationCreate(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultValidetion()
            this.getDefultValidetion()
            this.fileValidationForm.reset();
          })
      }
      else if (this.selectedTab == 'GSTR2B' && this.fileValidetionDefultGSTR2B.length == 0) {
        this.service.postValidationCreate(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultValidetion()
            this.getDefultValidetion()
            this.fileValidationForm.reset();
          })
      }
      else if (this.selectedTab == 'ITC' && this.fileValidetionDefultITC.length == 0) {
        this.service.postValidationCreate(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultValidetion()
            this.getDefultValidetion()
            this.fileValidationForm.reset();
          })
      }
    }
  }



  /* Initalization function of file Data Validation */

  initalizationFileDataValidation() {
    this.fileDataValidationForm = this.fb.group({
      gstr: this.fb.array([this.gstrControls()])
    })
    // this.gstr.push(this.gstrControls());
    // this.gstr.push(this.gstrControls());
  }

  get gstr() {
    return this.fileDataValidationForm.controls['gstr'] as FormArray;
  }


  gstrControls(): FormGroup {
    return this.fb.group({
      active: ['true'],
      columnName: [''],
      type: ['', [Validators.required]],
      format: ['', [Validators.required]],
      mandatory: ['true', [Validators.required]]
    })
  }

  /* Name : File Data Validation 
   @purpose : used to verify file Data Validation api
   @parameter : Include ITC api    */
  gettingValidationCheck() {
    this.postBody = {
      active: true,
      fileType: this.selectedTab == 'GSTR2B' ? "GSTR2B" : 'ITC',
      columnValidationRules: this.gstr.value,
      recon: null
    }                                         /* file data validation  api*/
    if (this.selected == 'fileDataValidation' && this.editButton == false) {

      this.service.postValidationCheck(this.postBody)
        .subscribe(res => {
          this._toast.success(`Applied File Validation Successful`);
          this.getDefultDataValidetion()
          this.getDefultDataValidetion()
          this.fileValidationForm.reset();
        })
    }
    if (this.selected == 'fileDataValidation' && this.editButton == true) {
      if (this.selectedTab == 'GSTR2B' && this.isGSTR2B.length > 0) {
        this.postBody.id = this.fileDataValidetionDefultGSTR2B[0]?.id
        this.service.putValidationCheck(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultDataValidetion()
            this.getDefultDataValidetion()
            this.fileValidationForm.reset();

          })
      }
      if (this.selectedTab == 'ITC' && this.isITC.length > 0) {
        this.postBody.id = this.fileDataValidetionDefultITC[0]?.id
        this.service.putValidationCheck(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultDataValidetion()
            this.getDefultDataValidetion()
            this.fileValidationForm.reset();

          })
      }
      if (this.selectedTab == 'GSTR2B' && this.isGSTR2B.length == 0) {
        this.service.postValidationCheck(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultDataValidetion()
            this.getDefultDataValidetion()
            this.fileValidationForm.reset();

          })
      }
      if (this.selectedTab == 'ITC' && this.isITC.length == 0) {
        this.service.postValidationCheck(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultDataValidetion()
            this.getDefultDataValidetion()
            this.fileValidationForm.reset();

          })
      }


    }

  }


  /* Initalization function of file Duplicate Check */

  initalizationFileDuplicate() {
    this.getColumnList();
    this.fileDuplicateForm = this.fb.group({
      present: ['', [Validators.required]]
    })


  }

  initalizationRecordMatch() {
    this.recordMatchingForm = this.fb.group({
      recordMatch: this.fb.array([this.addRecordMatch()])
    })
  }


  get recordMatch() {
    return this.recordMatchingForm.controls['recordMatch'] as FormArray;
  }
  addRecordMatch(): FormGroup {
    return this.fb.group({
      recordMatch: ''
    })
  }

  gettingRecordMatching() {                                       /*  file duplicate check api*/
    this.postBody = {
      active: true,
      fileType: this.selectedTab == 'GSTR2B' ? "GSTR2B" : 'ITC',
      duplicateCriterias: this.recordMatchingForm.value
    }
    console.log(this.postBody)
  }


  /* Name : File Duplicate Check 
    @purpose : used to verify file Duplicate Check api
    @parameter : None    */

  gettingDuplicateCheck() {                                       /*  file duplicate check api*/
    this.postBody = {

      active: true,
      fileType: this.selectedTab == 'GSTR2B' ? "GSTR2B" : 'ITC',
      duplicateCriterias: this.fileDuplicateForm.value.present,
      recons: null,
    }
    if (this.selected == 'fileDuplicateCheck' && this.editButton == false) {
      this.service.postDuplicateCheck(this.postBody)
        .subscribe(res => {
          this._toast.success(`Applied File Validation Successful`);
          this.fileValidationForm.reset();
        })
    }

    if (this.selected == 'fileDuplicateCheck' && this.editButton == true) {
      if (this.selectedTab == 'GSTR2B' && this.isDuplicateGSTR2B && this.isDuplicateGSTR2B.length > 0) {
        if(this.fileValidetionDefultGSTR2B && this.fileValidetionDefultGSTR2B.length > 0)
        this.postBody.id = this.fileValidetionDefultGSTR2B[0]?.id
        this.service.putDuplicateCheck(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.getDefultDuplicateValidetion();
            this.fileValidationForm.reset();
            this
          })

      }
      else if (this.selectedTab == 'ITC' && this.isDuplicateGSTR2B && this.isDuplicateGSTR2B.length > 0) {
        this.postBody.id = this.fileValidetionDefultITC && this.fileValidetionDefultITC[0] && this.fileValidetionDefultITC[0].id ? this.fileValidetionDefultITC[0].id : 1,
          this.service.putDuplicateCheck(this.postBody)
            .subscribe(res => {
              this._toast.success(`Applied File Validation Successful`);
              this.getDefultDuplicateValidetion();
              this.fileValidationForm.reset();
            })
      }
      else if (this.selectedTab == 'GSTR2B') {
        this.service.postDuplicateCheck(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.fileValidationForm.reset();
          })

      }
      else if (this.selectedTab == 'ITC') {
        this.service.postDuplicateCheck(this.postBody)
          .subscribe(res => {
            this._toast.success(`Applied File Validation Successful`);
            this.fileValidationForm.reset();
          })
      }


    }
    else {
      this._toast.error(`Please select/fill all mandatory deatils.`);
    }
    this.fileDuplicateForm.reset()
  }

  // validationForm(){
  //   if(this.fileDataValidationForm.invalid  ){
  //     alert("Message")
  //   }
  //   if(this.fileDataValidationForm.valid){
  //     this.gettingValidationCheck()
  //   }
  // }

  /* *purpose : used to running specific form */
  selectedRecord() {                                              /*  condition on a Save button */
    if (this.selected == 'fileValidation') {
      this.getttingValidationCreate()
    }
    if (this.fileDataValidationForm.invalid && this.selected == 'fileDataValidation') {
      alert("PLEASE FILL ALL RECORDS")
    }
    if (this.fileDataValidationForm.valid || this.selected == 'fileDataValidation') {
      this.gettingValidationCheck()
    }
    if (this.selected == 'fileDuplicateCheck') {
      this.gettingDuplicateCheck()

    }

    if (this.selected == 'recordMatching' || this.selected == 'recordMatchingDefault') {
      console.log(this.recordMatchingForm.value)
      this.saveRecordingMatching()

    }
  }

  get validationForFile() {
    return this.fileValidationForm.controls
  }

  get validationForDuplicate() {
    return this.fileDuplicateForm.controls
  }


  edit() {
    this.editButton = true
    this.isFileDataValidetionDefult = false;
    this.isFileValidetionDefult = false;
    this.isRecordMatching = false
    this.isFileDuplicateValidetionDefult = false

    if (this.selected == 'fileValidation' && this.selectedTab == 'GSTR2B') {
      this.fileValidationForm.patchValue({
        type: this.fileValidetionDefultGSTR2B[0].type,
        exists: this.fileValidetionDefultGSTR2B[0].discardIfExistsDataMTN,
        invalid: this.fileValidetionDefultGSTR2B[0].discardIfInvalidDataMTN,
        duplicate: this.fileValidetionDefultGSTR2B[0].discardIfDuplicateRecordsMTN
      })
    }
    if (this.selected == 'fileDataValidation' && this.selectedTab == 'GSTR2B') {
      this.fileDataValidationForm.reset({
        gstr: []
      });
      for (let i = 1; i < this.isGSTR2B.length; i++) {
        this.addDataValidationCards()
      }
      this.fileDataValidationForm.patchValue({
        gstr: this.isGSTR2B
      })

    }
    if (this.selected == 'fileDataValidation' && this.selectedTab == 'ITC') {
      this.fileDataValidationForm.reset({
        gstr: []
      });
      for (let i = 1; i < this.isITC.length; i++) {
        this.addDataValidationCards()
      }
      this.fileDataValidationForm.patchValue({
        gstr: this.isITC
      })
    }

    if (this.selected == 'fileValidation' && this.selectedTab == 'ITC') {
      this.fileValidationForm.patchValue({
        type: this.fileValidetionDefultITC[0].type,
        exists: this.fileValidetionDefultITC[0].discardIfExistsDataMTN,
        invalid: this.fileValidetionDefultITC[0].discardIfInvalidDataMTN,
        duplicate: this.fileValidetionDefultITC[0].discardIfDuplicateRecordsMTN
      })
    }

    if (this.selected == 'fileDuplicateCheck' && this.selectedTab == 'GSTR2B') {

      this.fileDuplicateForm.patchValue({
        present: this.isDuplicateGSTR2B
      })
    }
    if (this.selected == 'fileDuplicateCheck' && this.selectedTab == 'ITC') {
      this.fileDuplicateForm.patchValue({
        present: this.isDuplicateITC
      })
    }
    if (this.selected == 'recordMatching') {
      let temp: any[] = [];
      this.ruleList.forEach((element: any) => {
        this.addMoreRecord();
        temp.push({
          'recordMatch': element.id
        })
      });
      this.recordMatch.patchValue(temp);
    }
  }
  valuePatchGSTR2B() {
    if (this.selected == 'fileValidation' && this.selectedTab == 'GSTR2B') {
      this.fileValidationForm.patchValue({
        type: this.fileValidetionDefultGSTR2B[0].type,
        exists: this.fileValidetionDefultGSTR2B[0].discardIfExistsDataMTN,
        invalid: this.fileValidetionDefultGSTR2B[0].discardIfInvalidDataMTN,
        duplicate: this.fileValidetionDefultGSTR2B[0].discardIfDuplicateRecordsMTN
      })
    }
    if (this.selected == 'fileDataValidation' && this.selectedTab == 'GSTR2B') {
     
      this.fileDataValidationForm.reset({
        gstr: []
      })
      this.fileDataValidationForm.patchValue({
        gstr: this.isGSTR2B
      })
    }
    if (this.selected == 'fileDuplicateCheck' && this.selectedTab == 'GSTR2B') {

      this.fileDuplicateForm.patchValue({
        present: this.isDuplicateGSTR2B
      })
    }
  }
  valuePatchITC() {
    if (this.selected == 'fileValidation' && this.selectedTab == 'ITC') {
      this.fileValidationForm.patchValue({
        type: this.fileValidetionDefultITC[0].type,
        exists: this.fileValidetionDefultITC[0].discardIfExistsDataMTN,
        invalid: this.fileValidetionDefultITC[0].discardIfInvalidDataMTN,
        duplicate: this.fileValidetionDefultITC[0].discardIfDuplicateRecordsMTN
      })
    }
    if (this.selected == 'fileDataValidation' && this.selectedTab == 'ITC') {
      this.fileDataValidationForm.reset({
        gstr: []
      })
      this.fileDataValidationForm.patchValue({
        gstr: this.isITC
      });
    }
    if (this.selected == 'fileDuplicateCheck' && this.selectedTab == 'ITC') {
      this.fileDuplicateForm.patchValue({
        present: this.isDuplicateITC
      })
    }
  }
  postItcData() {
    this.isFileValidetionDefult = false;
    this.isFileDuplicateValidetionDefult = false;
    this.editButton = true
  }
  getAllRules() {
    this.service.getAllRules()
      .subscribe((res: any) => {
        this.allRules = res.data;
        console.log(this.allRules)
      })
  }
  saveRecordingMatching() {
    const selectedRule = this.recordMatchingForm.value.recordMatch.map((res: { recordMatch: any; }) => res.recordMatch);
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
    let reqData = {
      "rulesId": rulesId,
      recordMatchingId: this.recordMatcingId
    }
    if(this.isAvialbleRecordMatching){
      this.service.updateRecordingMatching(reqData)
      .subscribe((res: any) => {
        this._toast.success(`Record matching updated sucessfully.`, 'Sucess')
      })

    } else{
      this.service.saveRecordingMatching(reqData)
      .subscribe((res: any) => {
        this._toast.success(`Record matching saved sucessfully.`, 'Sucess')
      })

    } 
  }
  cancel(){
    if(this.selected=='fileValidation')
    this.getDefultValidetion();
    if(this.selected=='fileDataValidation')
    this.getDefultDataValidetion();
    if(this.selected=='fileDuplicateCheck')
    this.getDefultDuplicateValidetion();
    if(this.selected=='recordMatching')
    this.getRecordMatching();
  }
}
