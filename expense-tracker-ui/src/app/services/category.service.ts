import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private apiUrl: string = environment.apiUrl + '/categories';

    constructor(private http: HttpClient) { }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, category);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(this.apiUrl + '/' + id);
    }

    updateCategory(id: string, category: Category): Observable<Category> {
        return this.http.put<Category>(this.apiUrl + '/' + id, category);
    }

    deleteCategory(id: string): Observable<Category> {
        return this.http.delete<Category>(this.apiUrl + '/' + id);
    }

}
