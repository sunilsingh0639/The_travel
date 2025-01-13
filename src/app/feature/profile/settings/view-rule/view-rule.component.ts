import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-rule',
  templateUrl: './view-rule.component.html',
  styleUrls: ['./view-rule.component.scss']
})
export class ViewRuleComponent {
  viewData:any
  userForm!: FormGroup;
  editMode: boolean = false;
  selectedId: any;
  userById: any;
  roleName: any;
  selected: string = 'itcFilters';
  rolesList : any;
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
  addNewUser(){};
  navigate(){};
  constructor(private _fb: FormBuilder,  public dialogRef: MatDialogRef< ViewRuleComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.viewData= this.data
   console.log(this.data)
   
   
    this.userForm = this._fb.group({
      type: ['knockOff', Validators.required],
      selectionType: [''],
      name:['']
    })
  }
  addNewFilter(){
    this.filters.push(this.filters.length+1);
  }
  addNewLeftFilter(){
    this.leftFilters.push(1);
  }
  addNewRightFilter(){
    this.rightFilters.push(1);
  }
  
  public get type() : string {
    return this.userForm.value.type;
  }
  addNewMatchingCodition(){
    this.matchingConditions.push(1)
  }
  removeMatchingCodition(i: number){
    this.matchingConditions.splice(i,1)
  }
  onNoClick(): void {
    this.dialogRef.close();
}

}
 