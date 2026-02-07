import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl='http://localhost:8080/orders';
  constructor(private http: HttpClient, private authService: AuthService) { }

  booknow(payload:any):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(`${this.baseUrl}/book-now`, payload,{headers});
  }


getOrdersbyUser(email: string): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.getToken()}`
  });

  return this.http.get<any[]>(`${this.baseUrl}/user?usermail=${email}`, { headers });
}

}
