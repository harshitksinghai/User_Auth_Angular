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

  setAuthMode(mode: AuthMode) {
    this.authMode.set(mode)
  }
  setOtpMode(mode: OtpMode | null) {
    this.otpMode.set(mode)
  }
  setIsLoading(isLoading: boolean) {
    this.isLoading.set(isLoading)
  }
  setError(error: string | null) {
    this.error.set(error)
  }
}
