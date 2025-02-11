import { Routes } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { OnBoardComponent } from "./pages/on-board/on-board.component";

export const authRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'onboard',
        component: OnBoardComponent
    },
    {
        
    }
];
