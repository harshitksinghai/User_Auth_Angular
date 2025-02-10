import { Routes } from "@angular/router";
import { MarketingComponent } from "./pages/marketing/marketing.component";

export const marketingRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MarketingComponent
    }
];