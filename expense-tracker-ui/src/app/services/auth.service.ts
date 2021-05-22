import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = environment.apiUrl + '/auth';

    constructor(private http: HttpClient) { }

    register(data: { email: string, password: string }): void {
        this.http.post<string>(this.apiUrl + '/register', data).subscribe(
            res => console.log(res));
    }

    login(data: { email: string, password: string }): void {
        this.http.post<string>(this.apiUrl + '/login', data).subscribe(
            res => console.log(res));
    }

}
