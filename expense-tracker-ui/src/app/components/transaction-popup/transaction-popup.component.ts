import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { Category } from 'src/app/models/category';
import { Transaction } from 'src/app/models/transaction';
import { CategoryService } from 'src/app/services/category.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
    selector: 'app-transaction-popup',
    templateUrl: './transaction-popup.component.html',
    styleUrls: ['./transaction-popup.component.css']
})
export class TransactionPopupComponent implements OnInit {

    transactionForm: FormGroup = this.formBuilder.group({
        category: [null, Validators.required],
        amount: [null, [
            Validators.required,
            Validators.pattern('^[1-9][0-9]*$')
        ]],
        date: [null, Validators.required],
        note: null
    });
    categoryGroups: Object[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private transactionService: TransactionService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private categoryService: CategoryService,
        private notifier: NotifierService,
        private dialogRef: MatDialogRef<TransactionPopupComponent>) { }

    ngOnInit(): void {
        this.getTransaction();
        this.getCategories();
    }

    saveTransaction(): void {
        if (this.transactionForm.invalid) return;
        const transaction: Transaction = { ...this.transactionForm.value };
        if (this.data.mode === 'create') {
            this.transactionService.createTransaction(transaction).subscribe(() => {
                this.notifier.notify('success', 'Transaction created successfully');
                this.close();
            });
        } else {
            this.transactionService.updateTransaction(this.data.id, transaction).subscribe(() => {
                this.notifier.notify('success', 'Transaction updated successfully');
                this.close();
            });
        }
    }

    getTransaction(): void {
        if (this.data.mode !== 'update') return;
        this.transactionService.getTransaction(this.data.id).subscribe(
            res => this.transactionForm.patchValue(res));
    }

    deleteTransaction(): void {
        this.transactionService.deleteTransaction(this.data.id).subscribe(() => {
            this.notifier.notify('success', 'Transaction deleted successfully');
            this.close();
        });
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

    categoryCompareWith(c1: Category, c2: Category): boolean {
        return c1 && c2 && c1._id === c2._id;
    }

    close(): void {
        this.dialogRef.close();
    }

}
