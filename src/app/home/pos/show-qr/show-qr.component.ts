import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-show-qr',
    templateUrl: './show-qr.component.html',
    styleUrls: ['./show-qr.component.scss']
})
export class ShowQrComponent implements OnInit {

    public myQrCode: string = null;
    public myQrSize: string = null;
    rpiPaid = 'PAID';

    constructor(
        public dialogRef: MatDialogRef<ShowQrComponent>,
        @Inject(MAT_DIALOG_DATA) public qrdata: any,
    ) {
        this.myQrSize = '250';
        this.myQrCode = JSON.stringify(this.qrdata);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() { }

}
