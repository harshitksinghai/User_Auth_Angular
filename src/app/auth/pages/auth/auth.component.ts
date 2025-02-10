import { Component } from '@angular/core';
import { MarketingHeaderComponent } from "../../../marketing/components/marketing-header/marketing-header.component";
import { AuthHomeComponent } from "../../components/auth-home/auth-home.component";

@Component({
  selector: 'app-auth',
  imports: [MarketingHeaderComponent, AuthHomeComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
