import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

    transactions: Transaction[] = [];

    constructor(
        private dialog: MatDialog,
        private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.getTransactions();
    }

    openPopup(): void {
        this.dialog.open(TransactionPopupComponent);
    }

    getTransactions(): void {
        this.transactionService.getTransactions().subscribe(
            res => this.transactions = res);
    }

}
