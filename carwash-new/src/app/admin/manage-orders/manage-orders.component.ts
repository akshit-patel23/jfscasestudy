import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import { WasherService } from '../../core/services/washer.service';

@Component({
  selector: 'app-manage-orders',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent implements OnInit {

  orders: any[] = [];
  filteredOrders: any[] = [];
  loading = true;
  availableWashers: any[] = [];

  // Filter properties
  activeFilter = 'pending';
  filters = [
    { label: 'Pending Orders', value: 'pending' },
    { label: 'Assigned Orders', value: 'assigned' },
    { label: 'Completed Orders', value: 'completed' }
  ];

  // Modal properties
  showModal = false;
  selectedOrder: any = null;
  selectedWasherId = '';

  constructor(
    private adminService: AdminService,
    private washerService: WasherService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchAvailableWashers();
  }

  fetchOrders(): void {
    this.adminService.getallorders().subscribe({
      next: orders => {
        this.orders = orders;
        this.loading = false;
        this.applyFilter();
      },
      error: err => {
        console.error('Error fetching orders:', err);
        this.loading = false;
      }
    });
  }

  fetchAvailableWashers(): void {
    this.washerService.getAvailableWashers().subscribe({
      next: washers => this.availableWashers = washers,
      error: err => console.error('Error fetching washers', err)
    });
  }

  setFilter(filterValue: string): void {
    this.activeFilter = filterValue;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.activeFilter) {
      case 'pending':
        this.filteredOrders = this.orders.filter(order =>
          !order.washerId || order.status === 'PENDING'
        );
        break;
      case 'assigned':
        this.filteredOrders = this.orders.filter(order =>
          order.washerId && order.status !== 'COMPLETED'
        );
        break;
      case 'completed':
        this.filteredOrders = this.orders.filter(order =>
          order.status === 'COMPLETED'
        );
        break;
      default:
        this.filteredOrders = this.orders;
    }
  }

  openAssignModal(order: any): void {
    this.selectedOrder = order;
    this.selectedWasherId = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedOrder = null;
    this.selectedWasherId = '';
  }

  confirmAssignment(): void {
    if (!this.selectedWasherId || !this.selectedOrder) return;

    const payload = {
      orderId: this.selectedOrder.orderId,
      washerId: this.selectedWasherId
    };

    this.adminService.assignWasherToOrder(payload).subscribe({
      next: () => {
        this.fetchOrders();
        this.closeModal();
      },
      error: err => console.error('Error assigning washer', err)
    });
  }
}
