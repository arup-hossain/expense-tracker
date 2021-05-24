import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { Transaction } from 'src/app/models/transaction';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

    transactions: Transaction[] = [];
    categoryGroups: Object[] = [];
    categories: Category[] = [];

    constructor(
        private dialog: MatDialog,
        private transactionService: TransactionService,
        private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.getTransactions();
        this.getCategories();
    }

    openPopup(mode: string, id?: string): void {
        this.dialog.open(TransactionPopupComponent, {
            data: { mode, id }
        });
    }

    getTransactions(): void {
        this.transactionService.getTransactions(this.categories).subscribe(
            res => this.transactions = res);
    }

    getCategories(): void {
        this.categoryService.getCategories('Expense').subscribe(res => {
            this.categoryGroups.push({
                name: 'Expense',
                categories: res
            })
        });
        this.categoryService.getCategories('Income').subscribe(res => {
            this.categoryGroups.push({
                name: 'Income',
                categories: res
            })
        });
    }

}
