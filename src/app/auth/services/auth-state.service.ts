import { Injectable, signal } from '@angular/core';
import { AuthMode } from '../enums/AuthMode';
import { OtpMode } from '../enums/OtpMode';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  authMode = signal<AuthMode>(AuthMode.VERIFY_EMAIL);
  otpMode = signal<OtpMode | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  email = signal<string>('');

  setEmail(email: string) {
    this.email.set(email)
  }
  getEmail() {
    return this.email();
  }

  setAuthMode(mode: AuthMode) {
    this.authMode.set(mode)
  }

  setOtpMode(mode: OtpMode | null) {
    this.otpMode.set(mode)
  }
  getOtpMode() {
    return this.otpMode();
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading.set(isLoading)
  }
  setError(error: string | null) {
    this.error.set(error)
  }
  clearError() {
    this.error.set(null)
  }
  
}
