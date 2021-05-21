import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private apiUrl: string = environment.apiUrl + '/transactions';

    constructor(private http: HttpClient) { }

    createTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(this.apiUrl, transaction);
    }

}
