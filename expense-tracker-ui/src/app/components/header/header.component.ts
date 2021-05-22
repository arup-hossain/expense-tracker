import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    authenticated: boolean = false;
    authSub: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.checkAuth();
    }

    checkAuth(): void {
        this.authService.getAuthObs().subscribe(res => this.authenticated = res);
        this.authService.triggerAuthObs();
    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }

    logout(): void {
        this.authService.logout();
    }

}
