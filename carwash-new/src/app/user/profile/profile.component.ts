import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { AdminService } from '../../core/services/admin.service';
import { WasherService } from '../../core/services/washer.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profileData: any = null;
  isEditMode: boolean = false;
  role: string = 'user';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private adminService:AdminService,
    private washerService:WasherService
  ) {}

  ngOnInit(): void {
    this.role=this.authService.getUserRole() ||'user';
    console.log(this.role);
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']  // ✅ Added address field
    });


    this.loadProfileByRole(this.role);
  }

  loadProfileByRole(role: string): void {
    let profileObservable;

    switch(role){
      case 'ADMIN':
        profileObservable=this.adminService.getProfile();
        break;

      case 'WASHER':
        profileObservable=this.washerService.getProfile();
        break;

      case 'USER':

      default:
        profileObservable = this.userService.getProfile();
    }

    profileObservable.subscribe({
      next: (res: { name: string; email: string; phone: string; address: string }) => {
        this.profileData = res;
        this.profileForm.patchValue({
          name: res.name,
          email: res.email,
          phone: res.phone,
          address: res.address  // ✅ Patch address
        });
      },
      error: (err: any) => {
        console.error('Failed to load profile', err);
      }
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;

    const payload = {
      name: this.profileForm.value.name,
      phone: this.profileForm.value.phone,
      address: this.profileForm.value.address  // ✅ Include address in payload
    };
    console.log(payload);

    let updateObservable;

    switch(this.role){
      case 'ADMIN':
        updateObservable = this.adminService.updateAdminProfile(payload);
        break;

      case 'WASHER':
        updateObservable=this.washerService.updateWasherProfile(payload);
        break;

      case 'USER':
        default:
          updateObservable=this.userService.updateProfile(payload);
    }
    updateObservable.subscribe({
      next: () => {
        alert('Profile updated successfully');
        this.isEditMode = false;
        this.loadProfileByRole(this.role);  // Refresh data after update
      },
      error: (err: any) => {
        console.error('Failed to update profile', err);
      }
    });
  }
}
