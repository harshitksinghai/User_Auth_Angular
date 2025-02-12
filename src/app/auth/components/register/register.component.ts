import { NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  private authState = inject(AuthStateService);
  private authService = inject(AuthService);

  @Input({ required: true }) onEmailChange!: (email: string) => void;

  email = '';
  password = '';
  confirmPassword = '';

  ngOnInit(): void {
    this.email = this.authState.getEmail();
  }

  handleRegister() {
    this.authService.handleRegister(this.email, this.password);
  }
}
