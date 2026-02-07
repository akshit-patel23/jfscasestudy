import { AuthService } from './../../../core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menubar',
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {

@Input() role: string = '';

}
