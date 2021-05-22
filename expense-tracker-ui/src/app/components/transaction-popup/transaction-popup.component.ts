import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
    selector: 'app-transaction-popup',
    templateUrl: './transaction-popup.component.html',
    styleUrls: ['./transaction-popup.component.css']
})
export class TransactionPopupComponent implements OnInit {

    transactionForm: FormGroup = this.formBuilder.group({
        amount: [null, [
            Validators.required,
            Validators.pattern('^[1-9][0-9]*$')
        ]],
        date: [null, Validators.required],
        note: null
    });

    constructor(
        private formBuilder: FormBuilder,
        private transactionService: TransactionService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.getTransaction();
    }

    saveTransaction(): void {
        if (this.transactionForm.invalid) return;
        const transaction: Transaction = { ...this.transactionForm.value };
        if (this.data.mode === 'create') {
            this.transactionService.createTransaction(transaction).subscribe();
        } else {
            this.transactionService.updateTransaction(this.data.id, transaction).subscribe();
        }
    }

    getTransaction(): void {
        if (this.data.mode !== 'update') return;
        this.transactionService.getTransaction(this.data.id).subscribe(
            res => this.transactionForm.patchValue(res));
    }

    deleteTransaction(): void {
        this.transactionService.deleteTransaction(this.data.id).subscribe();
    }

}
