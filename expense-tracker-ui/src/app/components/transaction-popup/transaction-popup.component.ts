import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        private transactionService: TransactionService) { }

    ngOnInit(): void { }

    saveTransaction(): void {
        if (this.transactionForm.invalid) return;
        const transaction: Transaction = { ...this.transactionForm.value };
        this.transactionService.createTransaction(transaction).subscribe();
    }

}
