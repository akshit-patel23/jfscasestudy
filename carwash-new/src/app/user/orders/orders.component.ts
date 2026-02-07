import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



interface Order {
  orderId: string;
  userMail: string;
  washerId: string | null;
  carNumber: string;
  packageName: string;
  addOns: string[];
  notes: string;
  washType: string;
  date: string;
  time: string;
  location: string;
  status: string;
  amount: number;
}

@Component({
  selector: 'app-orders',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private http: HttpClient, private authService: AuthService,private orderService:OrderService) {}

  ngOnInit(): void {
    const email = this.authService.getUserMail();
    console.log("email:",email) ;// Get email from JWT via AuthService
    if (email) {
      this.fetchOrders(email);
    } else {
      console.error('User email not found.');
    }
  }


fetchOrders(email: string): void {
  this.orderService.getOrdersbyUser(email).subscribe({
    next: (data) => this.orders = data,
    error: (err) => console.error('Error fetching orders:', err)
  });
}


}
