import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';   // Backend Spring Boot Auth endpoint

  constructor(private http: HttpClient) {}

  // Registration API call
  register(data: { name: string; email: string; password: string; }) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Login API call
  login(email: string, password: string ): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login`, payload); // Expecting a response with a JWT token
  }

  // Save JWT in localStorage
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get JWT from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
  }

  // Extract user role from JWT
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (err) {
      return null;
    }
  }

  getUserMail():string| null{
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null;
    } catch (err) {
      return null;
    }
  }
}
