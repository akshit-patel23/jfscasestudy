import { Component, OnInit } from '@angular/core';
import { WasherService } from '../../core/services/washer.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class WasherOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = true;

  selectedOrder: any = null;
  showCompleteForm = false;
  afterWashImageUrl: string = '';

  constructor(private washerService: WasherService) {}

  ngOnInit(): void {
    this.fetchAssignedOrders();
  }

  fetchAssignedOrders(): void {
    this.washerService.getAssignedOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching assigned orders:', err);
        this.loading = false;
      }
    });
  }

  openCompleteForm(order: any): void {
    this.selectedOrder = order;
    this.showCompleteForm = true;
    this.afterWashImageUrl = ''; // Reset image URL
  }

  closeCompleteForm(): void {
    this.showCompleteForm = false;
    this.selectedOrder = null;
    this.afterWashImageUrl = '';
  }

  submitCompletion(): void {
    if (!this.selectedOrder || !this.afterWashImageUrl.trim()) {
      alert('Please provide an image URL');
      return;
    }

    const receiptDto = {
      afterWashImageUrl: this.afterWashImageUrl,
      packageName: this.selectedOrder.packageName,
      addOns: this.selectedOrder.addOns,
      totalAmount: this.selectedOrder.amount
    };

    console.log('Submitting completion for order:', this.selectedOrder.orderId);
    console.log('Receipt DTO:', receiptDto);

    this.washerService.completeOrder(this.selectedOrder.orderId, receiptDto).subscribe({
      next: (response) => {
        console.log('Order completed successfully:', response);
        alert('Order completed successfully!');
        this.closeCompleteForm();
        this.fetchAssignedOrders(); // Refresh orders
      },
      error: (err) => {
        console.error('Error completing order:', err);
        let errorMessage = 'Failed to complete order. Please try again.';
        
        if (err.status === 500) {
          errorMessage = 'Server error occurred. Please contact support or try again later.';
        } else if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        alert(errorMessage);
      }
    });
  }
}
