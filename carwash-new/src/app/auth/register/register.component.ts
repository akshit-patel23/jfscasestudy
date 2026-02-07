import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink,RouterLinkActive,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm:FormGroup;
  showPassword: boolean = false;
  constructor(
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder
  ){
    this.registerForm=this.fb.group({
      role: ['USER',Validators.required], // Default role set to 'user'
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
    });

  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  register(){
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe({
        next:()=>{
          console.log('Registration Successful');
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          alert('Registration Failed. Please try again.' + err.message);
        }
      });
    } else{
      alert('Please fill all required fields correctly.');
    }
  }
}
