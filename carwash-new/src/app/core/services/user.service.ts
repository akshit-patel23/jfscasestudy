import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8080/users';
  private userProfile:any=null;
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile(): Observable<any> {
    const headers = new HttpHeaders({

      Authorization: `Bearer ${this.authService.getToken()}`

    });

    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }

  getUserId(): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get(`${this.baseUrl}/id-from-token`, { headers, responseType: 'text' });
  }

  updateProfile(payload: { name?: string; phone?: string }): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<any>(`${this.baseUrl}/profile/update`, payload, { headers });
  }

  getCarsByUserId(userId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/${userId}/cars`, { headers });
  }

  deleteCar(userId: string, carId: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.delete(`${this.baseUrl}/${userId}/cars/${carId}`, {
      headers,
      responseType: 'text' // 👈 this tells Angular to expect plain text
    });
  }

  updateCar(userId: string, carId: string, payload: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    return this.http.patch<any>(`${this.baseUrl}/${userId}/cars/${carId}`, payload, { headers });
  }


addCar(userId: string, carData: any): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.authService.getToken()}`
  });
  return this.http.post(`${this.baseUrl}/${userId}/addcar`, carData,{headers});
}

}
