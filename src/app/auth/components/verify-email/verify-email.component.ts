import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../services/auth-state.service';


@Component({
  selector: 'app-verify-email',
  imports: [FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit{
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);

  email = '';

  ngOnInit(): void {
    this.email = this.authState.getEmail();
  }

  handleVerifyEmail() {
    this.authState.setEmail(this.email);
    this.authService.handleVerifyEmail(this.email);
  }

}
