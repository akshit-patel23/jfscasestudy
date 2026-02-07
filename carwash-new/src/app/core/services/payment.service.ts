import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl='http://localhost:8080/payments';
  constructor(private http: HttpClient, private authService: AuthService) { }

  createPaymentLink(req: any){
    console.log("text"+req);


    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/create-payment-link`, req,{headers});
  }

  getPaymentsbyMail(email: string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(`${this.baseUrl}/user?usermail=${email}`, { headers });
  }
}
