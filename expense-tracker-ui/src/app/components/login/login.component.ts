import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup = this.formBuilder.group({
        email: [null, [
            Validators.required,
            Validators.email
        ]],
        password: [null, Validators.required]
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService) { }

    ngOnInit(): void { }

    login(): void {
        if (this.loginForm.invalid) return;
        this.authService.login(this.loginForm.value);
    }

}
