import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { HomeComponent } from "../../components/home/home.component";

@Component({
  selector: 'app-marketing',
  imports: [HeaderComponent, HomeComponent],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {

}
