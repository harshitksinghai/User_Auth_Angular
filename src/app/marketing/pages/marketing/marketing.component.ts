import { Component } from '@angular/core';
import { MarketingHeaderComponent } from "../../components/marketing-header/marketing-header.component";
import { MarketingInfoComponent } from "../../components/marketing-info/marketing-info.component";

@Component({
  selector: 'app-marketing',
  imports: [MarketingHeaderComponent, MarketingInfoComponent],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {

}
