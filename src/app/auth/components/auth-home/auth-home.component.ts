import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { VerifyEmailComponent } from "../verify-email/verify-email.component";

@Component({
  selector: 'app-auth-home',
  imports: [NgIf, VerifyEmailComponent],
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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
    });
  }

}
