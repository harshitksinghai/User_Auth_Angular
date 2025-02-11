import { Injectable, inject } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { AuthStateService } from './auth-state.service';
import { CommonResponse } from '../../utils/commonTypes';
import { catchError, tap, throwError } from 'rxjs';
import { AuthMode } from '../enums/AuthMode';
import { OtpMode } from '../enums/OtpMode';
import { LoginRequest } from '../utils/authTypes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApi = inject(AuthApiService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  private currentOtpMode = this.authState.getOtpMode();

  handleVerifyEmail(email: string) {
    this.authState.setIsLoading(true);
    this.authApi.verifyEmail(email).pipe(
      tap((CommonResponse) => {
        if (!CommonResponse.status) {
          this.authState.setAuthMode(AuthMode.OTP);
          this.authState.setOtpMode(OtpMode.REGISTER);
        }
        else if (CommonResponse.status && CommonResponse.util) {
          this.authState.setAuthMode(AuthMode.LOGIN_PASSWORD);
        }
        else if (CommonResponse.status && !CommonResponse.util) {
          this.authState.setAuthMode(AuthMode.OTP);
          this.authState.setOtpMode(OtpMode.LOGIN);
        }
      }),
      catchError((error) => this.handleError('Verify Email failed to execute.', error))
    )
      .subscribe(() => {
        this.authState.setIsLoading(false);
      });
  }

  handleLoginPassword(email: string, password: string) {
    this.authState.setIsLoading(true);
    this.authApi.login({email, password}).pipe(
      tap((loginResponse) => {
        if (loginResponse.status) {
          this.authApi.checkOnboard().pipe(
            tap((checkOnBoardResponse) => {
              if (checkOnBoardResponse.status) {
                this.router.navigate(['/home']);
              }
              else {
                this.router.navigate(['/onboard']);
              }
            }),
            catchError(
              (error) => this.handleError('Check Onboard failed to execute.', error)
            )
          )
            .subscribe();
        }
      }),
      catchError((error) => this.handleError('Login failed to execute.', error))
    )
      .subscribe(() => {
        this.authState.setIsLoading(false);
      });
  }

  handleForgotPassword(email: string) {
    this.authApi.sendOtp(email).pipe(
      tap((CommonResponse) => {
        this.authState.setAuthMode(AuthMode.OTP);
        this.authState.setOtpMode(OtpMode.RESET_PASSWORD);
      }),
      catchError((error) => this.handleError('Forgot Password failed to execute.', error))
    )
    .subscribe();
  }

  handleOtpVerification(email: string, otp: string){
    this.authState.setIsLoading(true);
    this.authApi.verifyOtp({email, otp}).pipe(
      tap((CommonResponse) => {
        if(CommonResponse.status){
          if(this.currentOtpMode === OtpMode.LOGIN){
            this.authState.setOtpMode(null);
            this.router.navigate(['/home']);
          }
          else if(this.currentOtpMode === OtpMode.REGISTER){
            this.authState.setOtpMode(null);
            this.authState.setAuthMode(AuthMode.REGISTER);
          }
          else if(this.currentOtpMode === OtpMode.RESET_PASSWORD){
            this.authState.setOtpMode(null);
            this.authState.setAuthMode(AuthMode.RESET_PASSWORD);
          }
        }
        else{
          this.handleError('Invalid OTP', { error: { message: 'The OTP you entered is invalid.' } });
        }
      }),
      catchError((error) => this.handleError('OTP Verification failed to execute.', error))
    )
    .subscribe(() => {
      this.authState.setIsLoading(false);
    });
  }
  
  handleChangePasswordAndLogin(email: string, password: string){
    this.authState.setIsLoading(true);
    this.authApi.changePasswordAndLogin({email, password}).pipe(
      tap((changePasswordAndLoginResponse) => {
        if(changePasswordAndLoginResponse.status){
          this.authApi.checkOnboard().pipe(
            tap((checkOnBoardResponse) => {
              if (checkOnBoardResponse.status) {
                this.router.navigate(['/home']);
              }
              else {
                this.router.navigate(['/onboard']);
              }
            }),
            catchError(
              (error) => this.handleError('Check Onboard failed to execute.', error)
            )
          )
            .subscribe();
        }
      }),
      catchError((error) => this.handleError('Change Password and Login failed to execute.', error))
      )
      .subscribe(() => {
        this.authState.setIsLoading(false);
      });
  }

  handleRegister(email: string, password: string){
    this.authState.setIsLoading(true);
    this.authApi.register({email, password}).pipe(
      tap((registerResponse) => {
        if(registerResponse.status){
          this.router.navigate(['/onboard'])
        }
        else{
          this.handleError('Register failed to execute.', { error: { message: 'Register failed to execute.' } });
        }
  }),
  catchError((error) => this.handleError('Register failed to execute.', error))
)
.subscribe(() => {
  this.authState.setIsLoading(false);
})
  }

  private handleError(defaultMessage: string, error: any) {
    console.error('API error', error);
    const errorMessage = error?.error?.message || defaultMessage;
    this.authState.setError(errorMessage);
    this.authState.setIsLoading(false);

    return throwError(() => new Error(errorMessage));
  }
}
