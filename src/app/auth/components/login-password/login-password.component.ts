import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthMode } from '../../enums/AuthMode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-password',
  imports: [FormsModule],
  templateUrl: './login-password.component.html',
  styleUrl: './login-password.component.scss'
})
export class LoginPasswordComponent implements OnInit{
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  
  @Input({ required: true }) onEmailChange!: (email: string) => void;
  // @Output() emailChanged = new EventEmitter<string>();
  
  email = '';
  password = '';

  ngOnInit(): void {
    this.email = this.authState.getEmail();
  }


  handleLoginPassword() {
    this.authService.handleLoginPassword(this.email, this.password);
  }
}
