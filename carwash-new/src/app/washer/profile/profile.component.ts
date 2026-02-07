import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { WasherService } from '../../core/services/washer.service';

@Component({
  selector: 'app-washer-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class WasherProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profileData: any = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private washerService: WasherService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['']
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.washerService.getProfile().subscribe({
      next: (res: { name: string; email: string; phone: string; address: string }) => {
        this.profileData = res;
        this.profileForm.patchValue({
          name: res.name,
          email: res.email,
          phone: res.phone,
          address: res.address
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
      address: this.profileForm.value.address
    };

    this.washerService.updateWasherProfile(payload).subscribe({
      next: () => {
        alert('Profile updated successfully');
        this.isEditMode = false;
        this.loadProfile();
      },
      error: (err: any) => {
        console.error('Failed to update profile', err);
      }
    });
  }
}