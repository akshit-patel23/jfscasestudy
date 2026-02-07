import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl='http://localhost:8080/admin';
  constructor(private http: HttpClient, private authService: AuthService) { }
  getProfile(): Observable<any> {
    const headers = new HttpHeaders({

      Authorization: `Bearer ${this.authService.getToken()}`

    });

    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }

  updateAdminProfile(payload: { name?: string; phone?: string }): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<any>(`${this.baseUrl}/profile/update`, payload, { headers });
  }
  getpackages():Observable<any>{
    const headers = new HttpHeaders({
      Authorization:`Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.baseUrl}/packages/all`, { headers });
  }

  getaddons():Observable<any>{
    const headers=new HttpHeaders({
      Authorization:`Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.baseUrl}/addons/all`,{headers})
   }

    getallorders():Observable<any>{
      const headers= new HttpHeaders({
        Authorization:`Bearer ${this.authService.getToken()}`
      });
      return this.http.get<any>(`${this.baseUrl}/getallorders`,{headers})
    }



    assignWasherToOrder(payload:any): Observable<any> {
      const headers=new HttpHeaders({
        Authorization:`Bearer ${this.authService.getToken()}`
      });
      return this.http.put(`${this.baseUrl}/assign-order`, payload,{headers});
    }

    getAllUsers(): Observable<any> {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`
      });
      return this.http.get<any>(`${this.baseUrl}/allusers`, { headers });
    }

}
