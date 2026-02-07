import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashsummary',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashsummary.component.html',
  styleUrl: './dashsummary.component.css'
})
export class AdminDashsummaryComponent {

}
