import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashsummary',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './dashsummary.component.html',
  styleUrl: './dashsummary.component.css'
})
export class DashsummaryComponent {

}
