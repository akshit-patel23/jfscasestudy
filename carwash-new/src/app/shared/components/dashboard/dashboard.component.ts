import { Component, OnInit } from '@angular/core';
import { DashboardnavComponent } from '../dashboardnav/dashboardnav.component';
import { MenubarComponent } from '../menubar/menubar.component';
import { AuthService } from '../../../core/services/auth.service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardnavComponent, MenubarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role: string = '';
  
  constructor(private authservice: AuthService) { }
  
  ngOnInit(): void {
    this.role = this.authservice.getUserRole() ?? '';
  }
}
