import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponse } from '../../utils/commonTypes';
import { ChangePasswordAndLoginRequest, LoginRequest, OnboardRequest, RegisterRequest, VerifyOtpRequest } from '../utils/authTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/auth';

  verifyEmail(email: string): Observable<CommonResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.post<CommonResponse>(`${this.baseUrl}/verify-email`, null, { params });
  }

  login(data: LoginRequest): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.baseUrl}/login`, data);
  }

  sendOtp(email: string): Observable<CommonResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.post<CommonResponse>(`${this.baseUrl}/send-otp`, null, { params });
  }

  verifyOtp(data: VerifyOtpRequest): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.baseUrl}/verify-otp`, data);
  }

  register(data: RegisterRequest): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.baseUrl}/register`, data);
  }

  changePasswordAndLogin(data: ChangePasswordAndLoginRequest): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.baseUrl}/auth/change-password-and-login`, data);
  }

  checkOnboard(): Observable<CommonResponse> {
    return this.http.get<CommonResponse>(`${this.baseUrl}/auth/check-onboard`);
  }

  onboard(data: OnboardRequest): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.baseUrl}/auth/onboard`, data);
  }

  logout(): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.baseUrl}/auth/logout`, null);
  }

  refreshAccessToken(): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.baseUrl}/auth/refresh-token`, null, {
      withCredentials: true, // Required to include cookies in the request
    });
  }
}
