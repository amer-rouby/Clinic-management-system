import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    hidePassword = true;
    loginError = '';

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

            if (storedUser.username === username && storedUser.password === password) {
                this.loginError = '';
                // Perform further actions such as redirecting to another page
            } else {
                this.loginError = 'Invalid username or password';
            }
        }
    }
}
