import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LandingComponent } from './shared/components/landing/landing.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CarsComponent } from './user/cars/cars.component';
import { BookingformComponent } from './user/bookingform/bookingform.component';
import { OrdersummaryComponent } from './user/ordersummary/ordersummary.component';
import { DashsummaryComponent } from './user/dashsummary/dashsummary.component';
import { AdminDashsummaryComponent } from './admin/dashsummary/dashsummary.component';
import { WasherDashsummaryComponent } from './washer/dashsummary/dashsummary.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { WasherOrdersComponent } from './washer/orders/orders.component';
import { UserOrdersComponent } from './user/orders/orders.component';
import { PaymentsComponent } from './user/payments/payments.component';
import { ForgotpassComponent } from './auth/forgotpass/forgotpass.component';
import { AdminProfileComponent } from './admin/profile/profile.component';
import { WasherProfileComponent } from './washer/profile/profile.component';

export const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgot-password',component:ForgotpassComponent},
  // User Dashboard
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'', component:DashsummaryComponent},
      {path:'profile',component:ProfileComponent},
      {path:'user-orders',component:UserOrdersComponent},
      {path:'car',component:CarsComponent},
      {path:'booking',component:BookingformComponent},
      {path:'order-summary',component:OrdersummaryComponent},
      {path:'payment-history',component:PaymentsComponent}
    ]
  },
  // Admin Dashboard
  {
    path:"admin-dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'', component:AdminDashsummaryComponent},
      {path:'profile',component:AdminProfileComponent},
      {path:'manage-orders',component:ManageOrdersComponent},
      {path:'manage-users',component:ManageUsersComponent},
      {path:'reports',component:ReportsComponent}
    ]
  },
  // Washer Dashboard
  {
    path:"washer-dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'', component:WasherDashsummaryComponent},
      {path:'profile',component:WasherProfileComponent},
      {path:'washer-orders',component:WasherOrdersComponent}
    ]
  },
];


