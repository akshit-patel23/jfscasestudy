import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WasherService {

  private baseUrl='http://localhost:8080/washers';
  constructor(private http: HttpClient, private authService: AuthService) { }
  getProfile(): Observable<any> {
    const headers = new HttpHeaders({

      Authorization: `Bearer ${this.authService.getToken()}`

    });

    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }
  getAvailableWashers(): Observable<any[]> {
    const headers=new HttpHeaders({
      Authorization:`Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.baseUrl}/available`,{headers})
    }

    getAssignedOrders():Observable<any[]>{
      const headers=new HttpHeaders({
        Authorization:`Bearer ${this.authService.getToken()}`
      });
      return this.http.get<any>(`${this.baseUrl}/assignedorders`, {headers})
    }
    completeOrder(orderId: string, dto: any): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      });

      return this.http.put(`${this.baseUrl}/${orderId}/completed`, dto, { headers });
    }

    updateWasherProfile(payload: { name?: string; phone?: string }): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      });

      return this.http.patch<any>(`${this.baseUrl}/profile/update`, payload, { headers });
    }


}
