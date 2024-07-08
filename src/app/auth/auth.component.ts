import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedMaterialModule } from '../../Shared/modules/shared.material.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup;
  hidePassword = true;
  isLoginMode = true;
  loginError = '';

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.get('confirmPassword')?.clearValidators();
      this.authForm.get('confirmPassword')?.updateValueAndValidity();
    } else {
      this.authForm.get('confirmPassword')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.authForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
    this.authForm.reset();
  }

  login(): void {
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      if (storedUser.username === username && storedUser.password === password) {
        this.loginError = '';
        // Perform further actions such as redirecting to another page
      } else {
        this.loginError = 'Invalid username or password';
      }
    }
  }

  register(): void {
    if (this.authForm.valid && !this.authForm.hasError('mismatch')) {
      const { username, password } = this.authForm.value;
      localStorage.setItem('user', JSON.stringify({ username, password }));
      this.onSwitchMode(); // Switch to login mode after successful registration
    }
  }
}

