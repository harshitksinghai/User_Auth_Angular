import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { VerifyEmailComponent } from "../verify-email/verify-email.component";
import { LoginPasswordComponent } from "../login-password/login-password.component";
import { AuthMode } from '../../enums/AuthMode';
import { OtpComponent } from "../otp/otp.component";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-auth-home',
  imports: [NgIf, VerifyEmailComponent, LoginPasswordComponent, OtpComponent, ResetPasswordComponent, RegisterComponent],
  templateUrl: './auth-home.component.html',
  styleUrl: './auth-home.component.scss'
})
export class AuthHomeComponent implements OnInit{
  type: 'login' | 'register' = 'login';

  constructor(private route: ActivatedRoute) {}

  private authState = inject(AuthStateService);

  authMode = this.authState.authMode;
  otpMode = this.authState.otpMode;
  isLoading = this.authState.isLoading;
  error = this.authState.error;
  email = this.authState.email;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
    });
  }

  handleEmailChange = (newEmail: string) => {
    const currentEmail = this.authState.getEmail();
    if (newEmail !== currentEmail) {
      this.authState.setEmail(newEmail);
      this.authState.setOtpMode(null);
      this.authState.setAuthMode(AuthMode.VERIFY_EMAIL);
    }
  };
}
