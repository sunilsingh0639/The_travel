import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    data: any
}

@Component({
    selector: 'app-my-dialog',
    templateUrl: './my-dialog.component.html',
    styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent {

    selected: any;
    itcTotal: any;
    gstrTotal: any;
    constructor(
        public dialogRef: MatDialogRef<MyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        this.selected = data;
        this.itcTotal = 0;
        data.listOfReconMatchingVoITC.forEach((element: any) => {
            this.itcTotal += parseFloat(element.invoiceValue);
        });
        this.gstrTotal = 0;
        data.listOfReconMatchingVoGSTR.forEach((element: any) => {
            this.gstrTotal += parseFloat(element.invoiceValue);
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    submit(){
        this.dialogRef.close('submit');
    }
}
