import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
    }

    register(): void {
        if (this.registerForm.invalid) return;
        console.log(this.registerForm.value);
    }

}
