import { AdminService } from './../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-bookingform',
  imports: [CommonModule,ReactiveFormsModule, MatIconModule],
  templateUrl: './bookingform.component.html',
  styleUrl: './bookingform.component.css'
})
export class BookingformComponent {
  bookingform!: FormGroup;
  cars:any[]=[];
  packages:any[]=[];
  addons:any[]=[];
  totalAmount:number=0;
orderData: any;

  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private userService: UserService,
    private adminService:AdminService,
    private orderServie:OrderService
  ){
    this.bookingform = this.fb.group({
      carNumber: [''],
      packageName: [''],
      addOns: this.fb.array([]),
      notes: [''],
      location: [''],
      date: [''],
      time: [''],
      washtype: ['NOW'] // or 'SCHEDULED'
    });
  }

  ngOnInit(): void {
    this.fetchCars();
    this.fetchPackages();
    this.fetchAddons();
  }

  fetchCars() {
    this.userService.getUserId().subscribe({
      next: userId => {
        this.userService.getCarsByUserId(userId).subscribe({
          next: cars => {
            this.cars= cars;
          },
          error: err => {
            console.error('Error fetching cars:', err);

          }
        });
      },
      error: err => {
        console.error('Error fetching user ID:', err);
      }
    });
  }

  fetchPackages() {
    this.adminService.getpackages().subscribe({
      next:packages=>{
        this.packages=packages;
      },
      error:err=>{
        console.error('Error fetching packages:', err);
      }
    });
  }

  fetchAddons() {
    this.adminService.getaddons().subscribe({
      next:addons=>{
        this.addons=addons;
      },
      error:err=>{
        console.error('Error fetching addons:', err);
      }
    });
  }

  get addOnsArray(): FormArray {
    return this.bookingform.get('addOns') as FormArray;
  }

  onAddonChange(event: any, addonName: string) {
    if (event.target.checked) {
      this.addOnsArray.push(this.fb.control(addonName));
    } else {
      const index = this.addOnsArray.controls.findIndex(x => x.value === addonName);
      this.addOnsArray.removeAt(index);
    }
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    const selectedPackage = this.packages.find(p => p.packageType === this.bookingform.value.packageName);
    const selectedAddons = this.bookingform.value.addOns;

    this.totalAmount = 0;

    if (selectedPackage) {
      this.totalAmount += selectedPackage.price;
    }

    selectedAddons.forEach((addonName: string) => {
      const addon = this.addons.find(a => a.addonName === addonName);
      if (addon) {
        this.totalAmount += addon.price;
      }
    });
  }

  submitBooking() {
    const payload = {
      carNumber: this.bookingform.value.carNumber,
      packageName: this.bookingform.value.packageName,
      addOns: this.bookingform.value.addOns,
      notes: this.bookingform.value.notes,
      location: this.bookingform.value.location,
      // date: this.bookingform.value.date,
      // time: this.bookingform.value.time,
      // washtype: this.bookingform.value.washtype
    };


this.orderServie.booknow(payload).subscribe({
  next: response => {
    console.log('Booking successful:', response);
    this.router.navigate(['dashboard/order-summary'], { state: { order: response } });
  },
  error: err => {
    console.error('Booking failed:', err);
  }
});


  }
}

