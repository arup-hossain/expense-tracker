import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = environment.apiUrl + '/auth';
    private token: string;
    private authSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private router: Router) { }

    register(data: { email: string, password: string }): void {
        this.http.post<string>(this.apiUrl + '/register', data).subscribe(
            res => this.handleLogin(res));
    }

    login(data: { email: string, password: string }): void {
        this.http.post<string>(this.apiUrl + '/login', data).subscribe(
            res => this.handleLogin(res));
    }

    handleLogin(token: string): void {
        this.token = token;
        this.triggerAuthObs();
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
    }

    getAuthObs(): Observable<boolean> {
        return this.authSubject.asObservable();
    }

    triggerAuthObs(): void {
        this.authSubject.next(this.token !== undefined);
    }

    logout(): void {
        this.token = undefined;
        this.triggerAuthObs();
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    checkForToken(): void {
        const token: string = localStorage.getItem('token');
        if (!token) return;
        this.handleLogin(token);
    }

}
