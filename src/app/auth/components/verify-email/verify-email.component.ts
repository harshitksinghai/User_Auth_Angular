import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-verify-email',
  imports: [FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {
  private authService = inject(AuthService);

  email = '';

  verifyEmail() {
    this.authService.verifyEmail(this.email);
  }

}
