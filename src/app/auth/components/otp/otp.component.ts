import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../services/auth-state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  imports: [FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit{
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);

  @Input({ required: true }) onEmailChange!: (email: string) => void;

  email = '';
  otp = '';

  ngOnInit(): void {
    this.email = this.authState.getEmail();
  }

  handleOtpVerification() {
    this.authService.handleOtpVerification(this.email, this.otp);
  }

  handleSendOtp(){
    this.authService.handleSendOtp(this.email);
  }
}
