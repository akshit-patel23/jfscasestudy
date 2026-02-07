import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboardnav',
  imports: [ RouterLink, RouterLinkActive,MatIconModule],
  templateUrl: './dashboardnav.component.html',
  styleUrl: './dashboardnav.component.css'
})
export class DashboardnavComponent {
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userRole = this.authService.getUserRole() || 'User';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
