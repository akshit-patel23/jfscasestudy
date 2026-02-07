import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-payments',
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  payments :any[]=[];

  constructor(private authService:AuthService,private paymentService:PaymentService){};
  ngOnInit(): void {
    const email = this.authService.getUserMail();
    console.log("email:",email) ;// Get email from JWT via AuthService
    if (email) {
      this.fetchPayments(email);
    } else {
      console.error('User email not found.');
    }
  }
  fetchPayments(email:string):void{
    this.paymentService.getPaymentsbyMail(email).subscribe({
      next:(data)=>this.payments=data,
      error: (err) => console.error('Error fetching payments:', err)
    });

  }


}
