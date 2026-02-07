import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';


@Component({
  selector: 'app-ordersummary',
  imports: [CommonModule,ReactiveFormsModule, MatIconModule],
  templateUrl: './ordersummary.component.html',
  styleUrl: './ordersummary.component.css'
})
export class OrdersummaryComponent {
  orderData:any;

  constructor(private router:Router , private paymentService:PaymentService){
    const navState = this.router.getCurrentNavigation()?.extras.state;
    if(navState && navState['order']){
      this.orderData=navState['order'];
    }
  }


proceedToPay(orderId: string, amount: number,email:string) {
  const paymentRequest = {
    orderId: orderId,
    amount: amount,
    email: email
  };

  console.log('Payment request:', paymentRequest);

  this.paymentService.createPaymentLink(paymentRequest).subscribe({
    next: response => {
      console.log('Payment response:', response);
      if ((response as any).paymentLink) {
        window.location.href = (response as any).paymentLink;
      } else {
        console.error('No payment link in response:', response);
        alert('Payment link not received. Please try again.');
      }
    },
    error: (err) => {
      console.error('Payment link creation failed:', err);
      console.error('Error status:', err.status);
      console.error('Error message:', err.message);
      alert(`Failed to initiate payment: ${err.error?.message || err.message || 'Unknown error'}`);
    }
  });
}
}
