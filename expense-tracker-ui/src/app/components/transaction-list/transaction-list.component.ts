import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void { }

    openPopup(): void {
        this.dialog.open(TransactionPopupComponent);
    }

}
