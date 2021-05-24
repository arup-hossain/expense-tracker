import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
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

    getTransactions(categories: Category[]): Observable<Transaction[]> {
        let query = '?';
        if (categories.length > 0) {
            query += 'categories=';
            query += categories.join(',');
            console.log(query);
        }
        return this.http.get<Transaction[]>(this.apiUrl + query);
    }

    getTransaction(id: string): Observable<Transaction> {
        return this.http.get<Transaction>(this.apiUrl + '/' + id);
    }

    updateTransaction(id: string, transaction: Transaction): Observable<Transaction> {
        return this.http.put<Transaction>(this.apiUrl + '/' + id, transaction);
    }

    deleteTransaction(id: string): Observable<Transaction> {
        return this.http.delete<Transaction>(this.apiUrl + '/' + id);
    }

}
