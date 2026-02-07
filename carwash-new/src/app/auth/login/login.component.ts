import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


togglePassword() {
  this.showPassword = !this.showPassword;
}

  ngOnInit(): void {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      switch (this.authService.getUserRole()?.toLowerCase()) {
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'washer':
          this.router.navigate(['/washer-dashboard']);
          break;
        default:
          this.router.navigate(['/dashboard']);
          break;
      }
    }
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);

        // Redirect based on user role
        const role = this.authService.getUserRole();
        switch(role?.toLowerCase()) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'washer':
            this.router.navigate(['/washer-dashboard']);
            break;
          default:
            this.router.navigate(['/dashboard']);
            break;
        }
      },
      error: (err) => {
        alert('Login failed');
        console.error(err);
      }
    });
  }
}
