import { Component, Input, OnInit, inject, input } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);

  email = '';
  password = '';
  confirmPassword = '';

  ngOnInit(): void {
    this.email = this.authState.getEmail();
  }

  handleResetPassword() {
    this.authService.handleChangePasswordAndLogin(this.email, this.password);
  }

}
