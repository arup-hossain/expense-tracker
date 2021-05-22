import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup = this.formBuilder.group({
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

    register(): void {
        if (this.registerForm.invalid) return;
        this.authService.register(this.registerForm.value);
    }

}
